using backend.Repository;
using System.Data.Entity;

namespace backend.Unit_Of_Work
{
    public interface IUnitOfWork<out TContext> where TContext : DbContext, new()
    {
        public TokensRepository _tokensRepository { get; }
        void CreateTransaction();
        void Commit();
        void RollBack();
        void Save();
    }

}