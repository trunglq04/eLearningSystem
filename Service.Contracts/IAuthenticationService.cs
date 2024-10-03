﻿using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IAuthenticationService
    {
        Task<SignInResult> ValidateUser(LoginRequestDto userForAuth);
        Task<bool> IsUserEmailExist(ForgotPasswordRequestDto request);
        Task<(IdentityResult, string)> CreateUser(RegisterRequestDto registerUserDto, string role);
        Task<IdentityResult> ConfirmEmail(string email, string token);
        Task SendConfirmEmail(string email, string? role = "Learner", string? password = default);
        Task<TokenDto?> CreateToken(bool populateExp);
        Task<bool> IsRefreshTokenValid(string userId, string refreshToken);
        Task<string?> GetUserIdFromExpiredToken(string token);
    }
}
