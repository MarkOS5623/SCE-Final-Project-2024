using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SCE_Final_Project_2024.Areas.Identity.Data;

namespace SCE_Final_Project_2024.Areas.Identity.Data;

public class AccountDbContext : IdentityDbContext<Account>
{
    public AccountDbContext(DbContextOptions<AccountDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
    }
}
