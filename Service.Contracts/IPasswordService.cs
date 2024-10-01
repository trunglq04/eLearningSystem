using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IPasswordService
    {

        Task<string?> GeneratePasswordResetTokenAsync(string email);
        Task<bool> ValidatePasswordResetTokenAsync(string userId, string token);
        Task<IdentityResult> ResetPasswordByLinkAsync(ResetPasswordByLinkRequestDto request);

        Task<IdentityResult> ResetPassword(string email, ChangePasswordDto request);
    }
}
