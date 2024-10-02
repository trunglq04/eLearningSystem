using Shared.DataTransferObjects;

namespace Service.Contracts
{
    public interface IUserService
    {
        public Task<UserRequestDto> GetUser(string id);
        public Task<UserRequestDto> UpdateUser(UserRequestDto request);
    }
}
