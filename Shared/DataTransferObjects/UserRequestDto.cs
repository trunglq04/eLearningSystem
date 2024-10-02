using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record UserRequestDto
    {
        [Required]
        public string? Email { get; init; }
        [Required]
        public string? FullName { get; init; }
        [Required]
        public string? DateOfBirth { get; init; }
        [Required]
        public string? Gender { get; init; }
        [Required]
        public string? Image { get; init; }

    }
}
