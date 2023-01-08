using backend.Model;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AnswerRepository : IAnswerRepository
    {
        private EntitiesDbContext _entitiesDbContext;

        public AnswerRepository(EntitiesDbContext entitiesDbContext)
        {
            this._entitiesDbContext = entitiesDbContext;
        }

        public async Task<Answer> GetAnswerById(Guid answerId)
        {
            var answer = await _entitiesDbContext.Answer.FirstOrDefaultAsync(a => a.Id == answerId);

            if (answer is null)
            {
                throw new RepositoryException("Invalid answer");
            }
            return answer;
        }
    }
}
