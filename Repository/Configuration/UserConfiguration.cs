using Entities.Models;
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
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@elearning.com",
                }
            );
        }
    }
}
