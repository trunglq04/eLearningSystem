using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasData
            (
                new ApplicationUser
                {
                    Id = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                    UserName = "admin@elearning.com",
                    NormalizedUserName = "admin@elearning.com",
                    Email = "admin@elearning.com",
                    NormalizedEmail = "ADMIN@ELEARNING.COM",
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(null, "@Admin888"),
                    SecurityStamp = Guid.NewGuid().ToString()
                }
            );


        }
    }
}
