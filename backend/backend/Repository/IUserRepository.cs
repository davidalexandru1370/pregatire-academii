using backend.Model;

namespace backend.Repository
{
    public interface IUserRepository
    {
        Task<User> Add(User entity);
        Task Delete(User entity);
        Task<User> GetByEmail(string email);
        Task<User> GetById(Guid id);
        Task<User> Update(Guid useriD, User newEntity);
    }
}