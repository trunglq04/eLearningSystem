namespace Service.Contracts
{
    public interface IServiceManager
    {
        IAuthenticationService AuthenticationService { get; }
        IEmailService EmailService { get; }
        IPasswordService PasswordService { get; }
    }
}
