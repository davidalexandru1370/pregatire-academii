using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public partial class EntitiesDbContext : DbContext
    {
        public virtual DbSet<User> Users { set; get; }
        public virtual DbSet<Token> TokenDetails { get; set; }
        public virtual DbSet<ChangePasswordLinkAvailable> ChangePasswordLinkAvailables { get; set; }
        public virtual DbSet<Quiz> Quiz { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Answer> Answer { get; set; }
        public virtual DbSet<Room> Room { get; set; }

        public EntitiesDbContext(DbContextOptions<EntitiesDbContext> options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            optionsBuilder.UseNpgsql(@"Host=localhost;Username=postgres;Password=postgres;Database=Academii");
        }
    }
}
