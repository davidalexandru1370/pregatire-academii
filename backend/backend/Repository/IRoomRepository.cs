using backend.Model;

namespace backend.Repository
{
    public interface IRoomRepository
    {
        public Task Add(Room room);

        public Task Delete(Guid roomId);

        public Task<Room?> GetByUserId(Guid userId);
    }
}
