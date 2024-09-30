using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private ApplicationUser? _user;

        public AuthenticationService(IMapper mapper, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<bool> ValidateUser(LoginRequestDto loginUser)
        {
            _user = await _userManager.FindByNameAsync(loginUser.UserName);
            var result = (_user != null && await _userManager.CheckPasswordAsync(_user, loginUser.Password));
            return result;
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
                new Claim(ClaimTypes.Name, _user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(_user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

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

        public async Task<bool> CreateUser(RegisterRequestDto registerUserDto, string role)
        {
            var user = new ApplicationUser
            {
                UserName = registerUserDto.UserName?.Trim(),
                Email = registerUserDto.UserName?.Trim()
            };
            var identityResult = await _userManager.CreateAsync(user, registerUserDto.Password);

            if (!identityResult.Succeeded) return false;

            identityResult = await _userManager.AddToRoleAsync(user,  role);

            if (!identityResult.Succeeded)
                return false;

            return true;
        }
        
    }
}
