using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IUserService
    {

        public Task<UserRequestDto> GetUser(string id);
        public Task<UserRequestDto> UpdateUser(UserRequestDto request);
        public Task<IActionResult> UploadAvatarAsync(string userId, IFormFile file);
    }
}
