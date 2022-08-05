using backend.Model;
using System.Data.Entity;
using System.Data.Entity.Validation;


namespace backend.Repository
{
    public class TokenDetailsRepository : IRepository<Token>, IDisposable
    {
        private EntitiesDbContext _context;
        private string _errorMessage = string.Empty;

        public TokenDetailsRepository(EntitiesDbContext context)
        {
            _context = context;
        }

        public async void Add(Token entity)
        {
            if (entity == null)
            {
                throw new RepositoryException("invalid token");
            }

            await _context.TokenDetails.AddAsync(entity);
        }

        public void Delete(Token entity)
        {
            if (entity == null)
            {
                throw new RepositoryException("invalid token");
            }

            try
            {
                _context.TokenDetails.Remove(entity);
            }
            catch (DbEntityValidationException dbException)
            {
                _errorMessage = FormatErrorMessage(dbException);
                throw new RepositoryException(_errorMessage);
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<Token> GetById(Token entity)
        {
            var token = await _context.TokenDetails.FirstOrDefaultAsync(_token => _token.TokenValue == entity.TokenValue);

            if (token == null)
            {
                throw new RepositoryException("Invalid token value");
            }

            return token;
        }

        public async void Update(Token old_entity, Token new_entity)
        {

            if (old_entity == null || new_entity == null)
            {
                throw new RepositoryException("Invalid token value");
            }

            var token = await _context.TokenDetails.FirstOrDefaultAsync(t => t.TokenValue == old_entity.TokenValue);

            new_entity.TokenValue = token.TokenValue;
            token = new_entity;
        }

        private string FormatErrorMessage(DbEntityValidationException dbException)
        {
            string errorMessage = string.Empty;
            foreach (var validationErrors in dbException.EntityValidationErrors)
            {
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    errorMessage += String.Format("Property: {0} Error: ${1}", validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                }
            }
            return errorMessage;
        }
    }
}
