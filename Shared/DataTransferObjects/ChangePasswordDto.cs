using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record ChangePasswordDto
    {

        [MinLength(6)]
        [Required(ErrorMessage = "Password is required.")]
        public string NewPassword { get; init; }

        [Compare("NewPassword", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; init; }
    }
}
