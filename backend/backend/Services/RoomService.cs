using backend.Model;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class RoomService : IRoomService
    {
        public Task<Quiz> GetActiveUserQuiz(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateQuiz(Guid userId, Quiz newQuiz)
        {
            throw new NotImplementedException();
        }
    }
}
