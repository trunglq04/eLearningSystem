using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record UserRequestDto
    {
        public string? Email { get; init; }
        public string? FullName { get; init; } 
        public string? DateOfBirth { get; init; }
        public string? Gender { get; init; }
        public string? PhoneNumber { get; init; }
        public string? Image { get; init; }


    }
}
