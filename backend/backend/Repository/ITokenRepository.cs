using backend.Model;

namespace backend.Repository
{
    public interface ITokenRepository
    {
        Task Add(Token token);
        Task Delete(Token token);
        Task<Token> GetByTokenValue(Token token);
        Task<IEnumerable<Token>> GetByUserId(User user);
        Task<Token> Update(Token old_entity, Token new_entity);
    }
}