using backend.Model;

namespace backend.Repository
{
    public interface IAnswerRepository
    {
        public Task<Answer> GetAnswerById(Guid answerId);
    }
}