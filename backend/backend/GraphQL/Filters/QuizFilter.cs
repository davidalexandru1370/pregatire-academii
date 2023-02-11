using backend.Model;
using HotChocolate.Data.Filters;

namespace backend.GraphQL.Filters;

public class QuizFilter : FilterInputType<Quiz>
{
    protected override void Configure(IFilterInputTypeDescriptor<Quiz> descriptor)
    {
        
        
        base.Configure(descriptor);
    }
}