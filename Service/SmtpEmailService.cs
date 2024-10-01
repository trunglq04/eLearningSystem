using Service.Contracts;
using Mailjet.Client;
using Mailjet.Client.TransactionalEmails;
using Microsoft.Extensions.Configuration;

namespace Service
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly MailjetClient _mailjetClient;

        public SmtpEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _mailjetClient = new MailjetClient(configuration["Mailjet:ApiKey"], configuration["Mailjet:ApiSecret"]);
        }

        public async Task SendPasswordResetEmailAsync(string userEmail, string userName, string token)
        {
            var resetPasswordUrl = $"{_configuration["JwtSettings:ValidAudience"]}/reset-password?email={userEmail}&token={token}";

            var body = GenerateHtmlBody(userName, resetPasswordUrl);

            await SendEmailAsync(userEmail, subject: "Đặt lại mật khẩu", body);
        }
        public async Task SendConfirmEmailAsync(string userEmail, string token)
        {
            var resetPasswordUrl = $"{_configuration["JwtSettings:ValidAudience"]}/confirm-email";
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            keyValuePairs.Add("email", userEmail);
            keyValuePairs.Add("token", token);
            string url = UrlHelper.AddQuerryString(resetPasswordUrl, keyValuePairs);
            var body = GenerateConfirmEmailHtmlBody(userEmail, url);
            
            await SendEmailAsync(userEmail, subject: "Xác thực email", body);
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var fromEmail = _configuration["Mailjet:FromEmail"];
            var email = new TransactionalEmailBuilder()
                .WithFrom(new SendContact(fromEmail))
                .WithSubject(subject)
                .WithHtmlPart(body)
                .WithTo(new SendContact(toEmail))
                .Build();

            var response = await _mailjetClient.SendTransactionalEmailAsync(email);
        }

        private string GenerateHtmlBody(string userName, string resetPasswordUrl)
        {
            return $@"
            <p>Xin chào <strong>{userName}</strong>,</p>
            <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn đã yêu cầu điều này, vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu của bạn:</p>
            <p><a href=""{resetPasswordUrl}"" style=""background-color:#4CAF50;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;"">Đặt lại mật khẩu</a></p>
            <p>Liên kết này sẽ hết hạn sau 24 giờ. Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.</p>
            <p>Trân trọng,<br/>
            <strong>eLearning System</strong></p>
        ";
        }
        private string GenerateConfirmEmailHtmlBody(string userName, string confirmEmailUrl)
        {
            return $@"
            <p>Xin chào <strong>{userName}</strong>,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản trên hệ thống của chúng tôi. Để hoàn tất quá trình đăng ký, vui lòng xác thực địa chỉ email của bạn bằng cách nhấp vào liên kết dưới đây:</p>
            <p><a href=""{confirmEmailUrl}"" style=""background-color:#4CAF50;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;"">Xác thực email</a></p>
            <p>Liên kết này sẽ hết hạn sau 24 giờ. Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.</p>
            <p>Trân trọng,<br/>
            <strong>eLearning System</strong></p>
            ";
        }
    }
}
