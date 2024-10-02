using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IAuthenticationService
    {
        Task<SignInResult> ValidateUser(LoginRequestDto userForAuth);
        Task<bool> IsUserEmailExist(ForgotPasswordRequestDto request);
        Task<TokenDto?> CreateToken(bool populateExp);

        Task<IdentityResult> CreateUser(RegisterRequestDto registerUserDto, string role);
        Task<IdentityResult> ConfirmEmail(string email, string token);
        Task SendConfirmEmail(string email);
    }
}
