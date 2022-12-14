using backend.Model;

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
            return dbContext.Quiz.AsQueryable();
        }
    }
}