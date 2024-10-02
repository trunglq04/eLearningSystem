using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IUserService
    {

        public Task<UserRequestDto> GetUser(string id);
        public Task<(UserRequestDto, IdentityResult)> UpdateUser(UserRequestDto request, string id);
        public Task<IActionResult> UploadAvatarAsync(string userId, IFormFile file);
    }
}
