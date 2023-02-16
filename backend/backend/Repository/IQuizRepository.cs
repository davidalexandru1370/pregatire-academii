using backend.Model;
using System.Collections;

namespace backend.Repository
{
    public interface IQuizRepository
    {
        public Task<Quiz> GetQuizById(Guid quizId);

        public Task<IEnumerable<Quiz>> GetAllQuizzes();

        public Task<IEnumerable<Answer>> GetCorrectAnswersOfQuiz(Guid quizId);
    }
}
