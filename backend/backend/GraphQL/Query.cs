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
        public IQueryable<Quiz> GetQuizzes([Service] EntitiesDbContext dbContext, int? yearFilter)
        {
            if (yearFilter == 9999)
            {
                return dbContext.Set<Quiz>().AsQueryable();
            }
            return dbContext.Quiz.AsQueryable();
        }
    }
}