using backend.Exceptions;
using backend.Repository;
using Microsoft.EntityFrameworkCore;
//using en = System.Data.Entity;

namespace backend.Unit_Of_Work
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext>, IDisposable where TContext : DbContext
    {
        public UserRepository UserRepository { get; }
        
        public readonly TContext _context;

        public UnitOfWork(
            TContext context,
            UserRepository userRepository
            )
        {
            
            UserRepository = userRepository;
            _context = context;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public void CreateTransaction()
        {
            _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            _context.Database.CommitTransaction();
        }

        public void RollBack()
        {
            _context.Database.RollbackTransaction();
        }

        public async void SaveAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }   
            catch (Exception ex)
            {
                throw new UnitOfWorkException(ex.Message, ex.InnerException!);
            }
        }
        public TContext Context
        {
            get
            {
                return _context;
            }
        }
    }
}
