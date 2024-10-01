﻿using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public string? Description { get; set; }


    }
}
