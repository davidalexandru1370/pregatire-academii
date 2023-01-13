using backend.Model;

namespace backend.Services
{
    public interface IQuizService
    {
        public Task<Quiz> GetQuizById(Guid quizId);
    }
}