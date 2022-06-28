using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { set; get; }
    }
}
