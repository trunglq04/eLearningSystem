namespace Service.Contracts
{
    public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string userEmail, string userName, string token);
    }
}
