using backend.Model;
using Microsoft.EntityFrameworkCore;
namespace backend.Repository
{
    public class TokensRepository : IRepository<Tokens>
    {
        private EntitiesDbContext _dataContext;

        public TokensRepository(EntitiesDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async void Add(Tokens entity)
        {
            await _dataContext.Tokens.AddAsync(entity);
        }

        public async void Delete(Tokens entity)
        {
            var token = _dataContext.Tokens.FirstOrDefault(t0ken => t0ken.AccessToken == entity.AccessToken || t0ken.RefreshToken == entity.RefreshToken);

            if (token == null)
            {
                throw new RepositoryException("Unaunthificated user");
            }

            _dataContext.Tokens.Remove(token);

            await _dataContext.SaveChangesAsync();
        }

        public Tokens GetById(Tokens id)
        {
            var tokens = _dataContext.Tokens.FirstOrDefault(token => token.UserId == id.UserId);

            if (tokens == null)
            {
                throw new RepositoryException("Unaunthificated user");
            }

            return tokens;
        }

        public void Update(Tokens old_entity, Tokens new_entity)
        {
            //var tokens = _dataContext.Tokens.FirstOrDefault();
            var tokens = _dataContext.Tokens.FirstOrDefault(token => token.UserId == old_entity.UserId);
            tokens = new Tokens
            {
                AccessToken = new_entity.AccessToken,
                RefreshToken = new_entity.RefreshToken,
                UserId = new_entity.UserId,
            };
            _dataContext.Tokens.Update(tokens);

            /*if (tokens == null)
            {
                throw new RepositoryException("Unaunthificated user");
            }
            */

        }
    }
}
