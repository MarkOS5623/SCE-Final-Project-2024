using Microsoft.EntityFrameworkCore;

namespace SCE_Final_Project_2024.Areas.Documents.Data
{
    public class DocsContext : DbContext
    {
        public DocsContext(DbContextOptions<DocsContext> options) : base(options) { }

        public DbSet<Docs> Docs { get; set; }

        // Ensure that you override the OnModelCreating method to configure your entity.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity mapping here, if needed.
            modelBuilder.Entity<Docs>()
                .Property(d => d.DocumentContent)
                .HasColumnType("varbinary(max)");

            base.OnModelCreating(modelBuilder);
        }
    }
}
