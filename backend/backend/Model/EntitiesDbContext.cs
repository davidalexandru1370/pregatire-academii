﻿using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public partial class EntitiesDbContext : DbContext
    {
        public virtual DbSet<User> Users { set; get; }
        public virtual DbSet<Token> TokenDetails { get; set; }
        
        //public En.DbContextTransaction dbContextTransaction { get; set; }

        public EntitiesDbContext(DbContextOptions<EntitiesDbContext> options) : base(options)
        {

        }

        protected  override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
