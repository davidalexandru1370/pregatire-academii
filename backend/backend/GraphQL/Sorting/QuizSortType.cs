using backend.Model;
using HotChocolate.Data.Sorting;

namespace backend.GraphQL.Sorting
{
    public class QuizSortType : SortInputType<Quiz>
    {

        protected override void Configure(ISortInputTypeDescriptor<Quiz> descriptor)
        {


            base.Configure(descriptor); 
        }
    }
}
