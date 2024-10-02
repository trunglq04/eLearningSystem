﻿using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Service.Contracts;
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

        public UserService( UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserRequestDto> GetUser(string id)
        {
            var user =  await _userManager.FindByIdAsync(id);
            var userReturn = _mapper.Map<UserRequestDto>(user);
            return userReturn;
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
