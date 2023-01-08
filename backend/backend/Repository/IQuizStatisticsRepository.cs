using backend.Model;

namespace backend.Repository
{
    public interface IQuizStatisticsRepository
    {
        public Task AddSample(QuizStatistics quizStatistics);
    }
}