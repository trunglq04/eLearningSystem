namespace Shared.DataTransferObjects
{
    public record ResetPasswordByLinkRequestDto(string Email, string ResetToken, string NewPassword);
}
