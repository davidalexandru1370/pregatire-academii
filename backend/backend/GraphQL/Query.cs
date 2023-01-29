using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.GraphQL
{
    public class Query
    {
        [UseOffsetPaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseSorting]
        [UseFiltering]
        public IQueryable<Quiz> GetQuizzes([Service] EntitiesDbContext dbContext)
        {
            //return dbContext.Set<Quiz>().Include(dbContext).AsQueryable();
            return dbContext.Quiz.AsQueryable();
        }
    }
}