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
            // var answers = await _entitiesDbContext.Set<Answer>().Include(q => q.Question)
            //     .ThenInclude(q => q.Quiz.Id.CompareTo(quizId) == 0).FirstOrDefaultAsync() as IEnumerable<Answer>;

            var answers = (from q in _entitiesDbContext.Quiz where q.Id ==  quizId
                    join b in _entitiesDbContext.Question on q.Id equals b.Quiz.Id
                    join c in _entitiesDbContext.Answer on b.Id equals c.Question.Id
                    select c
                );
            
            return answers;
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
