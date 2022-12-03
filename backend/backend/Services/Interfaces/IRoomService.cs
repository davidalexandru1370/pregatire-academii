using backend.Model;

namespace backend.Services.Interfaces
{
    public interface IRoomService
    {
        public Task<Room> AddRoom(Room room);

        public Task<Quiz> GetActiveUserQuiz(Guid userId);

        public Task UpdateQuiz(Guid userId, Quiz newQuiz);
    }
}
