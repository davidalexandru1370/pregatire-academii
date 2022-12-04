using backend.Model;

namespace backend.Services.Interfaces
{
    public interface IRoomService
    {
        public Task<Room> AddRoom(Guid userId, Guid quizId);

        public Task<Quiz> GetActiveUserQuiz(Guid userId);

        public Task UpdateQuiz(Guid userId, Quiz newQuiz);
    }
}
