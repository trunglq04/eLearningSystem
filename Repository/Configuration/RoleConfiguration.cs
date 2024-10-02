using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<ApplicationRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationRole> builder)
        {
            builder.HasData
            (
                new ApplicationRole
                {
                    Id = new Guid("46c0e508-b293-49fb-b73d-a434b896c604"),
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR",
                    Description = "Administrator role with full rights"
                },
                new ApplicationRole
                {
                    Id = new Guid("7ab8cd5b-42af-42a3-9887-8b0df982104b"),
                    Name = "Tutor",
                    NormalizedName = "TUTOR",
                    Description = "Tutor role with rights to create courses and lessons"
                },
                new ApplicationRole
                {
                    Id = new Guid("10c68bf0-2e56-42b2-a734-69101ba2ae79"),
                    Name = "Learner",
                    NormalizedName = "LEARNER",
                    Description = "Learner role with rights to view courses and lessons"
                }
            );
        }
    }
}
