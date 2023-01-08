using backend.Model;

namespace backend.Repository
{
    public interface IQuizStatisticsRepository
    {
        public void AddSample(QuizStatistics quizStatistics);
    }
}