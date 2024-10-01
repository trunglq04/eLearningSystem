using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;
using System.Security.Claims;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;

        public AuthenticationController(IServiceManager service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerUserDto)
        {
            IdentityResult result = await _service.AuthenticationService.CreateUser(registerUserDto, "Learner");
            if (result.Succeeded)
            {
                await _service.AuthenticationService.SendConfirmEmail(registerUserDto.UserName);
                return Ok(new ResponseDto(["User registered successfully!"]));
            }
            else
            {
                List<string> error = result.Errors.Select(c => c.Description).ToList();

                return BadRequest(new ResponseDto(error));
            }
        }
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail()
        {
            string email = this.HttpContext.Request.Query["email"];
            string token = this.HttpContext.Request.Query["token"];

            var result = await _service.AuthenticationService.ConfirmEmail(email, token);
            if (!result.Succeeded)
            {
                List<string> error = result.Errors.Select(c => c.Description).ToList();

                return BadRequest(new ResponseDto(error));
            }
            return Ok(new ResponseDto(["Confirm email successful."]));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] LoginRequestDto user)
        {
            if (!await _service.AuthenticationService.ValidateUser(user))
                return Unauthorized(new ResponseDto(["Login failed! Wrong email or password."]));

            var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);
            return Ok(new ResponseDto(["Login successfully!"], tokenDto));
        }

    }
}
