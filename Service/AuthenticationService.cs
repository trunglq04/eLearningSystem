using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.Contracts;
using Shared.DataTransferObjects;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationUser? _user;

        public AuthenticationService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IConfiguration configuration, IEmailService emailService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<SignInResult> ValidateUser(LoginRequestDto loginUser)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(loginUser.UserName, loginUser.Password, isPersistent: false, lockoutOnFailure: true);

            if (signInResult.Succeeded)
            {
                _user = await _userManager.FindByNameAsync(loginUser.UserName);
                return signInResult;
            }

            var user = await _userManager.FindByNameAsync(loginUser.UserName);
            if (user is null || !await _userManager.CheckPasswordAsync(user, loginUser.Password))
                return SignInResult.Failed; // Username or password is incorrect

            // Email not confirmed
            return SignInResult.NotAllowed ;
        }

        public async Task<bool> IsUserEmailExist(ForgotPasswordRequestDto request)
        {
            _user = await _userManager.FindByEmailAsync(request.Email);
            var result = _user is not null;
            return result;
        }

        public async Task<TokenDto?> CreateToken(bool populateExp)
        {
            var accessToken = CreateJwtToken();
            var refreshToken = CreateRefreshToken();

            _user!.RefreshToken = refreshToken;

            if (populateExp)
                _user.RefreshTokenExpirationTime = DateTime.Now.AddDays(7);

            await _userManager.UpdateAsync(_user);
            return new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private string CreateJwtToken()
        {
            var claims = GetClaims().Result;
            var credentials = GetSigningCredentials();

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:ValidIssuer"],
                audience: _configuration["JwtSettings:ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            // Return Token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim("email", _user.UserName),
                new Claim("id", _user.Id.ToString()),
            };

            var roles = await _userManager.GetRolesAsync(_user);
            claims.AddRange(roles.Select(role => new Claim("role", role)));
            
            return claims;
        }

        private string CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<(IdentityResult, string)> CreateUser(RegisterRequestDto registerUserDto, string role)
        {
            var user = new ApplicationUser
            {
                UserName = registerUserDto.UserName?.Trim(),
                Email = registerUserDto.UserName?.Trim()
            };
            string pwd = registerUserDto.Password!;
            if(role != "Learner")
            {
               string[] custom = registerUserDto.FullName.Trim().Split(' ');
                foreach(string s in custom)
                {
                    pwd += s.Substring(0,1).ToLower();
                }
                pwd = $"{pwd.Trim()}@E{ new Random().Next() }";
                user.FullName = registerUserDto.FullName;
            }
            var identityResult = await _userManager.CreateAsync(user, pwd);
            if (!identityResult.Succeeded) return (identityResult,pwd);

            identityResult = await _userManager.AddToRoleAsync(user,  role);
            return (identityResult, pwd);
        }

        public async Task<IdentityResult> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            
            if (user is null)
                return IdentityResult.Failed(new IdentityError { Description = "Invalid information" });

            var identityResult = await _userManager.ConfirmEmailAsync(user, token);
            return identityResult;
        }

        public async Task SendConfirmEmail(string email, string? role = "Learner", string? password = default)
        {
            var user = await _userManager.FindByEmailAsync(email);
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            await _emailService.SendConfirmEmailAsync(email, token, role, password);
        }
    }
}
