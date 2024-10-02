using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Service.Contracts;
using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


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

        public async Task<(UserRequestDto, IdentityResult)> UpdateUser(UserRequestDto request, string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (DateTime.TryParse(request.DateOfBirth, out var date))
            {
                user.DateOfBirth = date;
            }
            user.FullName = request.FullName ?? user.FullName;
            user.Email = request.Email ?? user.Email;
            user.Image = request.Image ?? user.Image;
            user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;

            user.Gender = string.Equals(request.Gender, "male", StringComparison.OrdinalIgnoreCase);

            var result = await _userManager.UpdateAsync(user);

            var userReturn = _mapper.Map<UserRequestDto>(user);

            return (userReturn, result);
        }

    }
}
