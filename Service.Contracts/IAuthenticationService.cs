using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IAuthenticationService
    {
        Task<bool> ValidateUser(LoginRequestDto userForAuth);
        Task<bool> IsUserEmailExist(ForgotPasswordRequestDto request);
        Task<TokenDto?> CreateToken(bool populateExp);

        Task<bool> CreateUser(RegisterRequestDto registerUserDto, string role);
    }
}
