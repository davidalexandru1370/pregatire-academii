using backend.Model;

namespace backend.Repository
{
    public class TokenRepository : ITokenRepository
    {
        private readonly EntitiesDbContext _entitiesDbContext;

        public TokenRepository(EntitiesDbContext entitiesDbContext)
        {
            _entitiesDbContext = entitiesDbContext;
        }

        public async void Add(Token token)
        {
            if (token is null)
            {
                throw new RepositoryException("invalid token");
            }
            await _entitiesDbContext.AddAsync(token);
            await _entitiesDbContext.SaveChangesAsync();
        }

        public async void Delete(Token token)
        {
            if (token is null)
            {
                throw new RepositoryException("invalid token");
            }

            var result = _entitiesDbContext.Remove(token);
            if (result is null)
            {
                throw new RepositoryException("No token found!");
            }
            else
            {
                await _entitiesDbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Token>> GetByUserId(User user)
        {
            if (user is null)
            {
                throw new RepositoryException("Invalid user");
            }

            var tokens = _entitiesDbContext.Set<Token>().Where(t => t.UserId == user.Id).ToList();

            if (tokens is null || tokens.Count == 0)
            {
                throw new RepositoryException("User is not logged in");
            }

            return await Task.FromResult(tokens);
        }

        public Task<Token> GetByTokenValue(Token token)
        {
            if (token is null)
            {
                throw new RepositoryException("Token is invalid!");
            }

            var foundToken = _entitiesDbContext.TokenDetails.FirstOrDefault(t => t.TokenValue == token.TokenValue);

            if (foundToken is null)
            {
                throw new RepositoryException("No token found!");
            }

            return Task.FromResult(foundToken);
        }

        public async Task<Token> Update(Token oldToken, Token newToken)
        {
            if (oldToken is null || newToken is null)
            {
                throw new RepositoryException("One of the tokens does not exists!");
            }

            var modifedToken = _entitiesDbContext.TokenDetails.FirstOrDefault(t => t.TokenValue == oldToken.TokenValue);

            if (modifedToken is null)
            {
                throw new RepositoryException("User is not logged in");
            }

            modifedToken.OldTokenValue = modifedToken.TokenValue;
            modifedToken.TokenValue = newToken.TokenValue;

            await _entitiesDbContext.SaveChangesAsync();

            return modifedToken;
        }
    }
}
