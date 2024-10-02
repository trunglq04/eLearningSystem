using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects;

namespace eLearningSystem.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, LoginRequestDto>();
        }
    }
}
