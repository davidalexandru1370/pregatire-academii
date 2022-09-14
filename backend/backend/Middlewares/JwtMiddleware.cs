using backend.Model;
using backend.Repository;
using backend.Utilities;
using backend.Utilities.JWT;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Net;
using System.Threading.Tasks;

namespace backend.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly List<string> MiddlewareFor = new List<string> { "mainpage", "authorize" };

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, ITokenRepository tokenRepository, IJwtUtils jwtUtils, ICookieUtilities cookieUtilities, IOptions<AppSettings> options)
        {
            ITokenRepository _tokenRepository = tokenRepository;
            IJwtUtils _jwtUtils = jwtUtils;
            ICookieUtilities _cookieUtilities = cookieUtilities;
            AppSettings _appSettings = options.Value;
            char delimitator = '/';
            var path = httpContext.Request.Path.Value?.Split(delimitator).Where(s => String.IsNullOrWhiteSpace(s) == false).ToList();
            var saveResponseContentType = httpContext.Response.ContentType;

            httpContext.Response.ContentType = "application/json";

            if (path is null)
            {
                httpContext.Response.StatusCode = (int)StatusCodes.Status403Forbidden;
                await httpContext.Response.WriteAsync("Forbidden");
                return;
            }

            if (path.Count > 0 && MiddlewareFor.Contains(path[path.Count - 1]))
            {
                var accessToken = httpContext.Request.Cookies["accessToken"];
                var refreshToken = httpContext.Request.Cookies["refreshToken"];

                if (refreshToken is null || accessToken is null)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await httpContext.Response.WriteAsync("Forbidden");
                    return;
                }
                 
                Guid? userId = _jwtUtils.ValidateJwtToken(accessToken);

                Guid? isRefreshTokenValid = _jwtUtils.ValidateJwtToken(refreshToken);

                if (isRefreshTokenValid is null)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await httpContext.Response.WriteAsync("Forbidden");
                    return;
                }

                httpContext.Items["accessToken"] = accessToken;

                if (userId is null)
                {
                    string newAccessToken = _jwtUtils.GenerateJwtToken(new User { Id = Guid.Parse(_jwtUtils.GetFieldFromToken(accessToken, "Id")) }, _appSettings.AccessTokenTTL);
                    _cookieUtilities.setCookiePrivate("accessToken", newAccessToken, httpContext, options.Value.AccessTokenTTL);
                    httpContext.Items["accessToken"] = newAccessToken;
                }

                /* else
                 {
                     Token newRefreshToken = _jwtUtils.RotateRefreshToken(refreshToken);
                     await _tokenRepository.Update(new Token { TokenValue = refreshToken }, newRefreshToken);
                     var cookieExpirationDate = ((int)(DateTime.Now - _jwtUtils.GetExpirationDate(refreshToken)).TotalDays);
                     _cookieUtilities.setCookiePrivate("refreshToken", newRefreshToken.TokenValue, httpContext, cookieExpirationDate);

                     await _tokenRepository.Update(new Token() { TokenValue = refreshToken }, newRefreshToken);
                 }*/
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
