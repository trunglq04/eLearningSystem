
using System.ComponentModel.DataAnnotations;

namespace Shared.DataTransferObjects
{
    public record RegisterRequestDto 
    {
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string UserName { get; init; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; init; }

        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; init; }
    }   
}
