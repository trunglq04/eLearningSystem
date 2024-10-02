using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMediaService _mediaService;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, IMediaService mediaService)
        {
            _userManager = userManager;
             _mapper = mapper;
            _mediaService = mediaService;
        }

        public async Task<UserRequestDto> GetUser(string id)
        {
            var user =  await _userManager.FindByIdAsync(id);
            var userReturn = _mapper.Map<UserRequestDto>(user);
            return userReturn;
        }

        public Task<UserRequestDto> UpdateUser(UserRequestDto request)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> UploadAvatarAsync(string userId, IFormFile file)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) 
                return new NotFoundObjectResult(new ResponseDto(["User not found"]));

            try
            {
                var imageUrl = await _mediaService.UploadImageAsync(file);
                if (imageUrl is null)
                    return new BadRequestObjectResult(new ResponseDto(["Error uploading image"]));

                user.Image = imageUrl;
                var identityResult = await _userManager.UpdateAsync(user);
                if (identityResult.Succeeded)
                    return new OkObjectResult(new ResponseDto(["Image uploaded successfully"], imageUrl));
                else
                    return new BadRequestObjectResult(new ResponseDto(["Error uploading image"]));
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(new ResponseDto([e.Message]));
            }
        }

    }
}
