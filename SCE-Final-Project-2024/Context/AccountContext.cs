using Microsoft.EntityFrameworkCore;
using SCE_Final_Project_2024.Models;

namespace SCE_Final_Project_2024.Context
{
    public class AccountContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public AccountContext(DbContextOptions options) : base(options) 
        {

        }
    }
}
