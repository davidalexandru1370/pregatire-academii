using backend.Model;

namespace backend.Repository
{
    public interface IChangePasswordAvailableRepository : IRepository<ChangePasswordLinkAvailable>
    {
        public Task<ChangePasswordLinkAvailable> GetByUserId(Guid userId);
    }
}
