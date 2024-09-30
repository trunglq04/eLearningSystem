using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IPasswordService
    {

        Task<string?> GeneratePasswordResetTokenAsync(string email);
        Task<bool> ValidatePasswordResetTokenAsync(string userId, string token);
        Task ResetPasswordByLinkAsync(ResetPasswordByLinkRequestDto request);
    }
}
