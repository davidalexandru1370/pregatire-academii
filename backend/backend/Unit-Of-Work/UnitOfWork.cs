﻿using backend.Exceptions;
using backend.Repository;
using System.Data.Entity;

namespace backend.Unit_Of_Work
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext>, IDisposable where TContext : DbContext
    {
        public TokensRepository TokensRepository { get; }
        public TokenDetailsRepository TokenDetailsRepository { get; }
        public UserRepository UserRepository { get; }

        private DbContextTransaction _dbContextTransaction;
        public readonly TContext _context;

        public UnitOfWork(TokensRepository tokensRepository,
            TContext context,
            DbContextTransaction dbContextTransaction,
            TokenDetailsRepository tokenDetailsRepository,
            UserRepository userRepository
            )
        {
            TokensRepository = tokensRepository;
            TokenDetailsRepository = tokenDetailsRepository;
            UserRepository = userRepository;
            _context = context;
            _dbContextTransaction = dbContextTransaction;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public void CreateTransaction()
        {
            _dbContextTransaction = _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            _dbContextTransaction.Commit();
        }

        public void RollBack()
        {
            _dbContextTransaction.Rollback();
            _dbContextTransaction.Dispose();
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
