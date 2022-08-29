using System.ComponentModel;

namespace backend.Utilities
{
    public class CookieUtilities : ICookieUtilities
    {
        private HttpContext _httpContext;

        public CookieUtilities(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext.HttpContext;
        }

        public void setCookiePrivate(string cookieName, string cookieValue, int expirationTimeInDays = -1)
        {
            if (expirationTimeInDays == -1)
            {
                expirationTimeInDays = 9999;
            }
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(expirationTimeInDays),
            };
            _httpContext.Response.Cookies.Append(cookieName, cookieValue, cookieOptions);
        }

    }
}
