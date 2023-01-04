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
