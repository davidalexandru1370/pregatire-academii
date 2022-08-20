using backend.Utilities.JWT;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;

namespace backend.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly List<string> MiddlewareFor = new List<string> { "mainpage" };
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUserService userService, IJwtUtils jwtUtils)
        {
            char delimitator = '/';
            var path = httpContext.Request.Path.Value?.Split(delimitator).Where(s => String.IsNullOrWhiteSpace(s) == false).ToList();
            var saveResponseContentType = httpContext.Response.ContentType;

            httpContext.Response.ContentType = "application/json";

            if (path is null)
            {
                httpContext.Response.StatusCode = (int)StatusCodes.Status400BadRequest;
                await httpContext.Response.WriteAsync("Bad request");
                return;
            }

            if (MiddlewareFor.Contains(path[0]))
            {
                var token = httpContext.Request.Cookies["accessToken"];
                Guid? userId = jwtUtils.ValidateJwtToken(token);

                if (userId == null)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await httpContext.Response.WriteAsync("Forbidden");
                    return;
                }
            }
            httpContext.Response.ContentType = saveResponseContentType;
            await _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
