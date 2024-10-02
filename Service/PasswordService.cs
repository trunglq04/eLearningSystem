using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace Service
{
    internal class PasswordService : IPasswordService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;
        private ApplicationUser? _user = null;

        public PasswordService(UserManager<ApplicationUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<string?> GeneratePasswordResetTokenAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var pwResetToken = await _userManager.GeneratePasswordResetTokenAsync(user!);

            // Send email with reset password link 
            await _emailService.SendPasswordResetEmailAsync(userEmail: email, userName: user.UserName, token: pwResetToken);

            return pwResetToken;
        }

        public async Task<bool> ValidatePasswordResetTokenAsync(string email, string token)
        {
            _user = await _userManager.FindByEmailAsync(email);
            if (_user is null) return false;

            var isValid = await _userManager.VerifyUserTokenAsync(
                user: _user,
                tokenProvider: _userManager.Options.Tokens.PasswordResetTokenProvider,
                purpose: "ResetPassword",
                token: token
            );

            return isValid;
        }

        public async Task<IdentityResult> ResetPasswordByLinkAsync(ResetPasswordByLinkRequestDto request)
        {
            return await _userManager.ResetPasswordAsync(_user!, request.ResetToken, request.NewPassword);
        }

        public async Task<IdentityResult> ResetPassword(string email , ChangePasswordDto request)
        {
            var resetToken = await GeneratePasswordResetTokenAsync(email);
            ApplicationUser user = await _userManager.FindByEmailAsync(email);
            IdentityResult result = await _userManager.ResetPasswordAsync(user!, resetToken!, request.NewPassword);
            return result;
        }
    }
}
