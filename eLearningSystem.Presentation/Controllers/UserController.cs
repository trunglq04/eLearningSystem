using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
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
            if(userId == null) return Unauthorized((new ResponseDto(["Cannot get user"])));
            var user  = await _service.UserService.GetUser(userId);
            
            return Ok(new ResponseDto([userId], user));
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
            var user = await _service.UserService.UpdateUser(request);

            return Ok(new ResponseDto([userId], user));
        }

    }
}
