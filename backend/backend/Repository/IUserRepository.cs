using backend.Model;

namespace backend.Repository
{
    public interface IUserRepository
    {
        Task<User> Add(User entity);
        Task Delete(User entity);
        Task<User> GetByEmail(User entity);
        Task<User> GetById(User entity);
        Task<User> Update(User old_entity, User new_entity);
    }
}