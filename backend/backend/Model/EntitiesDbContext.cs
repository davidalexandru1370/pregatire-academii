using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class EntitiesDbContext : DbContext
    {
        public DbSet<User> Users { set; get; }
        public DbSet<Token> TokenDetails { get; set; }
        
        //public En.DbContextTransaction dbContextTransaction { get; set; }

        public EntitiesDbContext(DbContextOptions<EntitiesDbContext> options) : base(options)
        {

        }

        protected  override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
