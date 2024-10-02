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
            CreateMap<ApplicationUser, UserRequestDto>()
            .ForMember(c => c.DateOfBirth,
                opt => opt.MapFrom(x => x.DateOfBirth != null ? x.DateOfBirth.Value.ToString("dd/MM/yyyy") : "None"))
            .ForMember(c => c.Gender,
                opt => opt.MapFrom(x => x.Gender.HasValue ? (x.Gender.Value ? "Male" : "Female") : "None"))
            .ForMember(c => c.Image,
                opt => opt.MapFrom(x => x.Image ?? "None"))
            .ForMember(c => c.FullName,
                opt => opt.MapFrom(x => x.FullName ?? "None")); ;
            

        }
    }
}
