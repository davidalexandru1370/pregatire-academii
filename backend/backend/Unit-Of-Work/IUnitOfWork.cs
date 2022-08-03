using backend.Repository;
namespace backend.Unit_Of_Work
{
    public interface IUnitOfWork : IDisposable
    {
        public TokensRepository _tokensRepository { get; }
    }
}