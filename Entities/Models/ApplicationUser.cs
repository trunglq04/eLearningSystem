using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Entities.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [MaxLength(255)]
        public string? FullName { get; set; }
        
        public DateTime? DateOfBirth { get; set; }
        public bool? Gender { get; set; }
        public string? Image { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpirationTime { get; set; }
    }

}
