using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private EntitiesDbContext _dbContext;

        public RoomRepository(EntitiesDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task Add(Room room)
        {
            if (room is null)
            {
                throw new RepositoryException("invalid room");
            }
            try
            {
                await _dbContext.Room.AddAsync(room);
            }
            catch (Exception exception)
            {
                throw new RepositoryException(exception.Message);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Room?> GetByUserId(Guid userId)
        {
            var room = await _dbContext.Room.FirstOrDefaultAsync(r => r.UserId == userId);
            return room;
        }

        public async Task Delete(Guid roomId)
        {
            var room = await _dbContext.Room.FirstOrDefaultAsync(r => r.RoomId == roomId);

            if (room == null)
            {
                throw new RepositoryException("invalid room");
            }
            try
            {
                _dbContext.Remove(room);
            }
            catch (Exception dbException)
            {
                throw new RepositoryException(dbException.InnerException!.Message);
            }

            await _dbContext.SaveChangesAsync();
        }

    }
}
