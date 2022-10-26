using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.GraphQL
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        public IQueryable<Quiz> GetQuizzes([Service] EntitiesDbContext dbContext)
        {
            return dbContext.Quiz;
        }
    }
}
