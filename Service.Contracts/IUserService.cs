using Entities.Models;
using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Contracts
{
    public interface IUserService
    {
        public Task<UserRequestDto> GetUser(string id);
        public Task<UserRequestDto> UpdateUser(UserRequestDto request);
    }
}
