using AutoMapper;
using Entities.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Repository.Contracts;
using Service.Contracts;

namespace Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAuthenticationService> _authenticationService;
        private readonly Lazy<IEmailService> _emailService;
        private readonly Lazy<IPasswordService> _passwordService;
        private readonly Lazy<IUserService> _userService;
        private readonly Lazy<IMediaService> _mediaService;

        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper, IConfiguration configuration, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _authenticationService = new Lazy<IAuthenticationService>(() => 
                new AuthenticationService(signInManager, userManager, configuration, EmailService));

            _emailService = new Lazy<IEmailService>(() => 
                new SmtpEmailService(configuration));

            _passwordService = new Lazy<IPasswordService>(() =>
                new PasswordService(userManager, EmailService));

            _userService = new Lazy<IUserService>(() =>
                new UserService(userManager, mapper));


            _mediaService = new Lazy<IMediaService>(() =>
                new MediaService(configuration));

        }

        public IAuthenticationService AuthenticationService => _authenticationService.Value;
        public IEmailService EmailService => _emailService.Value;
        public IPasswordService PasswordService => _passwordService.Value;
        public IUserService UserService => _userService.Value;
        public IMediaService MediaService => _mediaService.Value;
    }
}
