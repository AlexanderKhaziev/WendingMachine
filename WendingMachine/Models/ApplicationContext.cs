using Microsoft.EntityFrameworkCore;

namespace WendingMachine.Models
{
    public class ApplicationContext : DbContext
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Coin> Coins { get; set; }

    }
}
