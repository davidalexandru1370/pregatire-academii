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

        public async Task Add(ChangePasswordLinkAvailable entity)
        {
            if (entity is null)
            {
                throw new RepositoryException("Invalid element");
            }
            try
            {
                _entitiesDbContext.ChangePasswordLinkAvailables.Add(entity);
            }
            catch (Exception)
            {
                throw;
            }
            await _entitiesDbContext.SaveChangesAsync();
        }

        public async Task Delete(ChangePasswordLinkAvailable entity)
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
            await _entitiesDbContext.SaveChangesAsync();
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

        public async Task Update(Guid oldEntityId, ChangePasswordLinkAvailable newEntity)
        {
            if (oldEntityId == Guid.Empty || newEntity is null)
            {
                throw new RepositoryException("Link-ul este invalid!");
            }

            var existingLink = _entitiesDbContext.ChangePasswordLinkAvailables.FirstOrDefault(e => e.pageId == oldEntityId);
            if (existingLink is not null)
            {
                await Delete(existingLink);
                await Add(newEntity);
                await _entitiesDbContext.SaveChangesAsync();
            }
            else
            {
                throw new RepositoryException("Link-ul este invalid!");
            }
        }

        public async Task<ChangePasswordLinkAvailable> GetByUserId(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new RepositoryException("Invalid id");
            }

            ChangePasswordLinkAvailable? linkAvailable = await _entitiesDbContext.ChangePasswordLinkAvailables.FirstOrDefaultAsync(l => l.userId == userId);
            
            if (linkAvailable is null)
            {
                throw new RepositoryException("Link not found");
            }

            return linkAvailable;
        }
    }
}
