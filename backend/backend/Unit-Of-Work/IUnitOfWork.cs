using backend.Model;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

namespace backend.Unit_Of_Work
{
    public interface IUnitOfWork<TContext> where TContext : DbContext
    {
        public void CreateTransaction();
        public void Commit();
        public void RollBack();
        public void SaveAsync();
        public TContext Context { get; }
    }

}