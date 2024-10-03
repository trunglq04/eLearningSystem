using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;
using System.Security.Claims;

namespace eLearningSystem.Presentation.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServiceManager _service;

        public UserController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet(Name = "GetUser")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.FindFirstValue("id");
            if (userId is null)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto(["Cannot get user id"]));

            var user = await _service.UserService.GetUser(userId);

            return Ok(new ResponseDto([$"Get user id {userId} successfully"], user));
        }

        [HttpGet("{userId}", Name = "GetUserById")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await _service.UserService.GetUser(userId);

            return Ok(new ResponseDto([$"Get user id {userId} successfully"], user));

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UserRequestDto request)
        {
            var userId = User.FindFirstValue("id");
            if (userId is null)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto(["Cannot get user id"]));

            var (user, result) = await _service.UserService.UpdateUser(request, userId);

            if (!result.Succeeded)
            {
                List<string> error = result.Errors.Select(c => c.Description).ToList();

                return BadRequest(new ResponseDto(error));
            }

            return Ok(new ResponseDto([$"Update user have id {user.FullName} successfully"], user));

        }

        [HttpPost("upload-avatar")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar([FromForm] IFormFile file)
        {
            var userId = User.FindFirstValue("id");
            if (userId is null)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto(["Cannot get user id"]));

            IActionResult response = await _service.UserService.UploadAvatarAsync(userId, file);

            return response;
        }

        [HttpPost("register")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateTutorAsync([FromBody] RegisterRequestDto registerUserDto)
        {
            if (string.IsNullOrEmpty(registerUserDto.UserName))
                return BadRequest(new ResponseDto(["Invalid input"]));
            var (result,pwd) = await _service.AuthenticationService.CreateUser(registerUserDto, "Tutor");
            if (result.Succeeded)
            {
                await _service.AuthenticationService.SendConfirmEmail(registerUserDto.UserName, role: "Tutor", pwd);
                return Ok(new ResponseDto(["User registered successfully!"]));
            }
            else
            {
                List<string> error = result.Errors.Select(c => c.Description).ToList();
                return BadRequest(new ResponseDto(error));
            }
            
        }
    }
}
