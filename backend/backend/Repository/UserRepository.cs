using backend.Model;
using backend.Unit_Of_Work;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace backend.Repository
{
    public class UserRepository : IRepository<User>, IDisposable
    {
        private bool _isDisposed;
        private string _errorMessages = string.Empty;
        private EntitiesDbContext _context;

        public UserRepository(EntitiesDbContext context)
        {
            _context = context;
        }

        public async void Add(User entity)
        {
            if (entity == null)
            {
                throw new RepositoryException("invalid user");
            }
            try
            {
                await _context.Users.AddAsync(entity);
            }
            catch (DbEntityValidationException dbException)
            {

            }
        }

        public void Delete(User entity)
        {
            if (entity == null)
            {
                throw new RepositoryException("invalid user");
            }
            try
            {
                _context.Users.Remove(entity);
            }
            catch (DbEntityValidationException dbException)
            {
                _errorMessages = FormatErrorMessage(dbException);
                throw new RepositoryException(_errorMessages);
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<User> GetById(User entity)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.id == entity.id);
            if (user == null)
            {
                throw new RepositoryException("User not found");
            }
            return user;
        }

        public async Task<User> GetByEmail(User entity)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == entity.email);
            if (user == null)
            {
                throw new RepositoryException("User not found");
            }
            return user;
        }

        public async void Update(User old_entity, User new_entity)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.id == old_entity.id);

            if (user == null)
            {
                throw new RepositoryException("User not found");
            }

            new_entity.id = old_entity.id;
            user = new_entity;
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
