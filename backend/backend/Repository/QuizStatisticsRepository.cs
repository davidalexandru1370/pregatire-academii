using backend.Model;

namespace backend.Repository
{
    public class QuizStatisticsRepository : IQuizStatisticsRepository
    {
        private EntitiesDbContext _entitiesDbContext;

        public QuizStatisticsRepository(EntitiesDbContext entitiesDbContext)
        {
            this._entitiesDbContext = entitiesDbContext;
        }

        public async Task AddSample(QuizStatistics quizStatistics)
        {
            if (quizStatistics is null)
            {
                throw new RepositoryException("null quiz");
            }
            try
            {
                await _entitiesDbContext.QuizStatistics.AddAsync(quizStatistics);
            }
            catch (Exception exception)
            {
                throw new RepositoryException(exception.Message);
            }
        }
    }
}