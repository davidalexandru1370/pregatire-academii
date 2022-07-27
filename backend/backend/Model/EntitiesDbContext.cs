using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class EntitiesDbContext : DbContext
    {
        public DbSet<User> Users { set; get; }
        public DbSet<Tokens> Tokens { get; set; }
        public DbSet<Token> AccessTokens { get; set; }
        public DbSet<Token> RefreshTokens { get; set; }

        public EntitiesDbContext(DbContextOptions<EntitiesDbContext> options) : base(options)
        {

        }

    }
}
