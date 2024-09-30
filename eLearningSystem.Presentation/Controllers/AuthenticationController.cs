using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly IEmailSender _emailSender;

        public AuthenticationController(IServiceManager service, IEmailSender emailSender)
        {
            _service = service;
            _emailSender = emailSender;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        //{
        //    return Ok();
        //}

        public async Task<IActionResult> Authenticate([FromBody] LoginRequestDto user)
        {
            if (!await _service.AuthenticationService.ValidateUser(user))
                return Unauthorized();

            var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);
            return Ok(tokenDto);
        }
    }
}
