using Shared.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Service.Contracts
{
    public interface IAuthenticationService
    {
        Task<bool> ValidateUser(LoginRequestDto userForAuth);
        Task<TokenDto?> CreateToken(bool populateExp);

        Task<bool> CreateUser(RegisterRequestDto registerUserDto, string role);
    }
}
