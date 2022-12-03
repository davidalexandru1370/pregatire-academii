using backend.Model;
using backend.Unit_Of_Work;
using Microsoft.EntityFrameworkCore;

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
            catch (Exception dbException)
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
            catch (Exception dbException)
            {
                _errorMessages = dbException.InnerException.Message;
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

            user.Name = newEntity.Name;
            user.Email = newEntity.Email;
            user.Password = newEntity.Password;

            await _context.SaveChangesAsync();

            return user;
        }
    }
}
