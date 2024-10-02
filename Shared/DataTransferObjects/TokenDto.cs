using System.ComponentModel.DataAnnotations;

namespace Shared.DataTransferObjects
{
    public record TokenDto
    {
        [Required]
        public string? AccessToken { get; init; }

        [Required]
        public string? RefreshToken { get; init; }
    }
}
