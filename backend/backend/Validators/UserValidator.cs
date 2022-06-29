using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Validators
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.ActionArguments.SingleOrDefault(p => p.Value is User);

            if (user.Value == null)
            {
                context.Result = new BadRequestObjectResult("Object is null");
                return;
            }

            if (!context.ModelState.IsValid)
            {
                context.Result = new UnprocessableEntityObjectResult(context.ModelState);
            }


        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}
