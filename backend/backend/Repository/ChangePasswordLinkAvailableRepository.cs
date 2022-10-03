using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ChangePasswordLinkAvailableRepository : IChangePasswordAvailableRepository
    {
        private readonly EntitiesDbContext _entitiesDbContext;
        public ChangePasswordLinkAvailableRepository(EntitiesDbContext context)
        {
            _entitiesDbContext = context;
        }

        public async void Add(ChangePasswordLinkAvailable entity)
        {
            if (entity is null)
            {
                throw new RepositoryException("Invalid element");
            }
            try
            {
                _entitiesDbContext.ChangePasswordLinkAvailables.Add(entity);
            }
            catch (Exception dbException)
            {
                throw;
            }
            await _entitiesDbContext.SaveChangesAsync();
        }

        public void Delete(ChangePasswordLinkAvailable entity)
        {
            if (entity is null)
            {
                throw new RepositoryException("Invalid element");
            }
            try
            {
                _entitiesDbContext.ChangePasswordLinkAvailables.Remove(entity);
            }
            catch (Exception)
            {

            }
        }

        public async Task<ChangePasswordLinkAvailable> GetById(Guid linkId)
        {
            if (linkId == Guid.Empty)
            {
                throw new RepositoryException("Invalid element");
            }

            var linkData = await _entitiesDbContext.ChangePasswordLinkAvailables.FirstOrDefaultAsync(e => e.pageId == linkId);

            if (linkData is not null)
            {
                return linkData;
            }

            throw new RepositoryException("No element found!");
        }

        public async void Update(Guid oldEntityId, ChangePasswordLinkAvailable newEntity)
        {
            if (oldEntityId == Guid.Empty || newEntity is null)
            {
                throw new RepositoryException("Invalid element");
            }

            var existingLink = _entitiesDbContext.ChangePasswordLinkAvailables.FirstOrDefault(e => e.pageId == oldEntityId);
            if (existingLink is not null)
            {
                existingLink.createdDate = newEntity.createdDate;
                existingLink.userId = newEntity.userId;
                await _entitiesDbContext.SaveChangesAsync();
            }
            throw new RepositoryException("Not found element");
        }
    }
}
