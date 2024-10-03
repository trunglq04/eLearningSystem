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

        public async Task<(UserRequestDto, IdentityResult)> UpdateUser(UserRequestDto request, string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (DateTime.TryParse(request.DateOfBirth, out var date))
            {
                user.DateOfBirth = date;
            }
            user.FullName = request.FullName ?? user.FullName;
            //user.Email = request.Email ?? user.Email;
            user.Image = request.Image ?? user.Image;
            user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;

            user.Gender = string.Equals(request.Gender, "male", StringComparison.OrdinalIgnoreCase);

            var result = await _userManager.UpdateAsync(user);

            var userReturn = _mapper.Map<UserRequestDto>(user);

            return (userReturn, result);
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

        public async Task<(List<UserRequestDto>,int?)> GetAllAsync(string role, PagingRequestDto requestDto)
        {
            // Query
            var listUser = await _userManager.GetUsersInRoleAsync(role);
            int totalElement = listUser.Count();
            // Filtering
            if (!string.IsNullOrWhiteSpace(requestDto.Query))
            {
                listUser = listUser.Where(x => x.FullName.Trim().Contains( requestDto.Query.Trim())).ToList();
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(requestDto.SortBy) && !string.IsNullOrWhiteSpace(requestDto.SortDirection))
            {
                if (string.Equals(requestDto.SortBy, "FullName", StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(requestDto.SortDirection.Trim(), "asc", StringComparison.OrdinalIgnoreCase)
                        ? true : false;

                    listUser = isAsc ? listUser.OrderBy(x => x.FullName.Trim()).ToList() : listUser.OrderByDescending(x => x.FullName.Trim()).ToList();
                }
                
            }

            // Pagination
            // PageNumber 1 page size 5 - skip 0, take 5
            // PageNumber 2 page size 5 - skip 5, take 5
            // PageNumber 3 page size 5 - skip 10, take 5
            var skipResults = (requestDto.PageNumber - 1) * requestDto.PageSize;
            listUser = listUser.Skip(skipResults ?? 0).Take(requestDto.PageSize ?? 100).ToList();
            var totalPage = totalElement/requestDto.PageSize;
            var listUserReturn = _mapper.Map<List<UserRequestDto>>(listUser);
            return (listUserReturn, totalPage);
        }
    }
}
