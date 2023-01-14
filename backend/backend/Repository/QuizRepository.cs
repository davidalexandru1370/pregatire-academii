using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class QuizRepository : IQuizRepository
    {
        private EntitiesDbContext _entitiesDbContext;

        public QuizRepository(EntitiesDbContext entitiesDbContext)
        {
            _entitiesDbContext = entitiesDbContext;
        }

        public async Task<IEnumerable<Quiz>> GetAllQuizzes()
        {
            var quizzes = _entitiesDbContext.Set<Quiz>().ToList();

            return await Task.FromResult(quizzes);
        }

        /*
        SELECT A.id FROM Answers A
        inner join Question Q on Q.id = A.questionId
        inner join Quiz U on U.id = Q.quizId
        where U.id = @quizId
        */

        public async Task<IEnumerable<Answer>> GetCorrectAnswersOfQuiz(Guid quizId)
        {
            var quiz = await GetQuizById(quizId);

            var answers = quiz.Question!.Select(q => q.Answers!.ToList()) as IEnumerable<Answer>;

            return answers!;
        }

        public async Task<Quiz> GetQuizById(Guid quizId)
        {
            var quiz = await _entitiesDbContext.Quiz.FirstOrDefaultAsync(q => q.Id == quizId);

            if (quiz is null)
            {
                throw new RepositoryException("Not found quiz");
            }

            return quiz;
        }

    }
}
