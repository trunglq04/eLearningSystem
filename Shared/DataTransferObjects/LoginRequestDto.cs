﻿using System.ComponentModel.DataAnnotations;

namespace Shared.DataTransferObjects
{
    public record LoginRequestDto
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; init; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; init; }
    }
}
