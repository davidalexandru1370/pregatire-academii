using backend.Model;
using backend.Unit_Of_Work;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.Validation;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private string _errorMessages = string.Empty;
        private EntitiesDbContext _context;

        public UserRepository(EntitiesDbContext context)
        {
            _context = context;
        }

        public async Task<User> Add(User entity)
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

            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(User entity)
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
            await _context.SaveChangesAsync();

        }

        public async Task<User> GetById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new RepositoryException("User not found");
            }

            return user;
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                throw new RepositoryException("User not found");
            }

            return user;
        }

        public async Task<User> Update(Guid userId, User newEntity)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new RepositoryException("User not found");
            }

            user = newEntity;
            

            await _context.SaveChangesAsync();

            return user;
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
