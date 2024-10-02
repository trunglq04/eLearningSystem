using Microsoft.AspNetCore.Identity;
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
        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequestDto request)
        {

            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.token))
                return BadRequest(new ResponseDto(["Invalid request."]));


            var result = await _service.AuthenticationService.ConfirmEmail(request.email, request.token);
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
            var result = await _service.AuthenticationService.ValidateUser(user);

            if (result.Succeeded)
            {
                var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);
                return Ok(new ResponseDto(["Login successfully!"], tokenDto));
            }
            else if (result.IsNotAllowed)
            {
                return BadRequest(new ResponseDto(["Email is not confirmed. Please check your email to confirm."]));
            }
            else
            {
                return BadRequest(new ResponseDto(["Invalid username or password."]));
            }
        }

    }
}
