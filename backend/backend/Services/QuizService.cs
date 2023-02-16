using backend.Model;
using backend.Repository;

namespace backend.Services
{
    public class QuizService : IQuizService
    {

        private readonly IQuizRepository _quizRepository;
        public QuizService(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        public Task<IEnumerable<Answer>> GetCorrectAnswersOfQuiz(Guid quizId)
        {
            return _quizRepository.GetCorrectAnswersOfQuiz(quizId);
        }

        public async Task<Quiz> GetQuizById(Guid quizId)
        {
            return await _quizRepository.GetQuizById(quizId);
        }
    }
}