using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.AspNetCore.Identity;

namespace Repository.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<Guid>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<Guid>> builder)
        {
            builder.HasData
            (
                new IdentityUserRole<Guid>
                {
                    RoleId = new Guid("46c0e508-b293-49fb-b73d-a434b896c604"),
                    UserId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
                }
            );
        }
    }
}
