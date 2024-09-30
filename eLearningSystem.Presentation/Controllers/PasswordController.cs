using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/password")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IServiceManager _service;

        public PasswordController(IServiceManager service)
        {
            _service = service;
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
        {
            if (request.Email is null) 
                return BadRequest(new ResponseDto(["Email is required."]));

            if (!await _service.AuthenticationService.IsUserEmailExist(request))
                return NotFound(new ResponseDto(["No account found for the provided email address."]));

            await _service.PasswordService.GeneratePasswordResetTokenAsync(request.Email);

            return Ok(new ResponseDto(["Password reset email sent, please check it!"]));
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordByLinkRequestDto request)
        {
            if (await _service.PasswordService.ValidatePasswordResetTokenAsync(request.Email, request.ResetToken))
            {
                await _service.PasswordService.ResetPasswordByLinkAsync(request);
                return Ok(new ResponseDto(["Password reset successful. Now, you can continue login."]));
            }
            else
            {
                return BadRequest(new ResponseDto(["Invalid password reset token."]));
            }
        }
    }
}
