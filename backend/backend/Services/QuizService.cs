using backend.Model;
using backend.Repository;

namespace backend.Services
{
    public class QuizService : IQuizService
    {

        private IQuizRepository _quizRepository;
        public QuizService(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        public Task<IEnumerable<Answer>> GetCorrectAnswersOfQuiz(Guid quizId)
        {
            throw new NotImplementedException();
        }

        public async Task<Quiz> GetQuizById(Guid quizId)
        {
            return await _quizRepository.GetQuizById(quizId);
        }
    }
}