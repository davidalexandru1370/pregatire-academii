using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class EntitiesDbContext : DbContext
    {
        public DbSet<User> Users { set; get; }
        public DbSet<Tokens> Tokens { get; set; }
        public DbSet<Token> TokenDetails { get; set; }

        public EntitiesDbContext(DbContextOptions<EntitiesDbContext> options) : base(options)
        {

        }

        protected  override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
