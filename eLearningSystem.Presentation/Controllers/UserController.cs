using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            string? userId = string.Empty;


            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var claim = identity.FindFirst("id");
                if (claim != null)
                {
                    userId = claim.Value;
                }
            }
            if (userId == null) return Unauthorized((new ResponseDto(["Cannot get user"])));
            var user = await _service.UserService.GetUser(userId);

            return Ok(new ResponseDto([$"Get user id {userId} successfully"], user));
        }

        [HttpGet("{id}", Name = "GetUserById")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserById(string id)
        {

            var user = await _service.UserService.GetUser(id);

            return Ok(new ResponseDto([$"Get user id {id} successfully"], user));

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UserRequestDto request)
        {
            string? userId = string.Empty;

            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var claim = identity.FindFirst("id");
                if (claim != null)
                {
                    userId = claim.Value;
                }
            }
            if (userId == null) return Unauthorized((new ResponseDto(["Cannot upadate user"])));
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
                return BadRequest(new ResponseDto(["Cannot get user id"]));

            IActionResult response = await _service.UserService.UploadAvatarAsync(userId, file);

            return response;
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTutorAsync([FromBody] RegisterRequestDto registerUserDto)
        {
            if (string.IsNullOrEmpty(registerUserDto.UserName))
                return BadRequest(new ResponseDto(["Invalid input"]));
            var (result, pwd) = await _service.AuthenticationService.CreateUser(registerUserDto, "Tutor");
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

        [HttpGet("get")]
        [Authorize]
        public async Task<IActionResult> GetAllByRole(
            [FromQuery] string role,
            [FromQuery] string? query,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDirection,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
            PagingRequestDto request = new()
            {
                Query = query,
                SortBy = sortBy,
                SortDirection = sortDirection,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
            if (string.IsNullOrEmpty(role) || role.ToLower() == "Admin".ToLower())
                return BadRequest(new ResponseDto(["Invalid input"]));
            var result = await _service.UserService.GetAllAsync(role, request);
                return Ok(new ResponseDto([$"Get all {role}  successfully!"], result));
           

        }
    }
}
