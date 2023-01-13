using backend.Model;

namespace backend.Services.Interfaces
{
    public interface IRoomService
    {
        public Task<Room> AddRoom(Guid userId, Guid quizId);

        public Task<Quiz> GetActiveUserQuiz(Guid userId);

        public Task UpdateQuiz(Guid userId, Quiz newQuiz);

        public Task AddEvaluatedQuizToUser(Guid userId, Guid quizId, int score);

        public Task<int> EvaluateQuiz(IEnumerable<Answer> answers);
    }
}