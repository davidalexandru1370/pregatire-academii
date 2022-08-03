using backend.Repository;

namespace backend.Unit_Of_Work
{
    public class UnitOfWork : IUnitOfWork
    {
        public TokensRepository _tokensRepository { get; }
        
        public UnitOfWork(TokensRepository tokensRepository)
        {
            _tokensRepository = tokensRepository;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }



        
    }
}
