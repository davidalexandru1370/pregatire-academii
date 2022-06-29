using backend.Model;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Validators
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if ((context.ModelState as User).password.Length==0)
            {

            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }

    public class UserValidatorException : Exception
    {
        public UserValidatorException(string message) : base(message)
        {

        }
    }

}
