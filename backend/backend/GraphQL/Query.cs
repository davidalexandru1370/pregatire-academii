using backend.Model;

namespace backend.GraphQL
{
    public class Query
    {
        [UseOffsetPaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<Quiz> GetQuizzes([Service] EntitiesDbContext dbContext)
        {
            Thread.Sleep(5000);
            return dbContext.Quiz.AsQueryable();
        }
    }
}