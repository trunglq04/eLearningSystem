using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Service.Contracts;
using Shared.DataTransferObjects;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService( UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
             _mapper = mapper;
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

        //public async Task<UserRequestDto> UpdateUser(UserRequestDto request)
        //{
        //    var user = _mapper.Map<ApplicationUser>(request);
        //     user = await  _userManager.UpdateAsync(user);
        //    var userReturn = _mapper.Map<UserRequestDto>(user);
        //    return user;
        //}
    }
}
