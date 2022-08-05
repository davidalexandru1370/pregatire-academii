using backend.Repository;
using System.Data.Entity;

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