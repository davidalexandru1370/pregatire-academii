﻿using backend.Model;
using backend.Repository;
using backend.Utilities;
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
        private readonly ITokenRepository _tokenRepository;
        private readonly IJwtUtils _jwtUtils;
        private readonly ICookieUtilities _cookieUtilities;
        public JwtMiddleware(RequestDelegate next, ITokenRepository tokenRepository, IJwtUtils jwtUtils, ICookieUtilities cookieUtilities)
        {
            _next = next;
            _tokenRepository = tokenRepository;
            _jwtUtils = jwtUtils;
            _cookieUtilities = cookieUtilities;
        }

        public async Task Invoke(HttpContext httpContext)
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

                if ((isRefreshTokenValid is null) == false)
                {
                    Token newRefreshToken = _jwtUtils.RotateRefreshToken(refreshToken);
                    await _tokenRepository.Update(new Token { TokenValue = refreshToken }, newRefreshToken);
                    var cookieExpirationDate = ((int)(DateTime.Now - _jwtUtils.GetExpirationDate(refreshToken)).TotalDays);
                    _cookieUtilities.setCookiePrivate("refreshToken", newRefreshToken.TokenValue, cookieExpirationDate);
                }
                else
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
