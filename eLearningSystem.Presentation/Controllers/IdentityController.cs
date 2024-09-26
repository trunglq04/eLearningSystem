using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.DataTransferObjects;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;

        public IdentityController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        //{
        //    return Ok();
        //}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        //{
        //    return Ok();
        //}
    }
}
