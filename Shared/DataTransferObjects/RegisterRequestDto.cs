
using System.ComponentModel.DataAnnotations;

namespace Shared.DataTransferObjects
{
    public record RegisterRequestDto
    {
        [Required]
        public string UserName { get; init; }

        public string? FullName { get; init; }

        public string? Password { get; init; }

        public string? ConfirmPassword { get; init; }
    }   
}
