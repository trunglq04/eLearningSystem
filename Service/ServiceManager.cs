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


        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _authenticationService = new Lazy<IAuthenticationService>(() => 
                new AuthenticationService(mapper, userManager, configuration));
        }
        public IAuthenticationService AuthenticationService => _authenticationService.Value;

    }
}
