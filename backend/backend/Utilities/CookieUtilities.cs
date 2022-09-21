using System.ComponentModel;

namespace backend.Utilities
{
    public class CookieUtilities : ICookieUtilities
    {
        public CookieOptions privateCookieOptions = new CookieOptions()
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Expires = DateTime.Now,
        };

        public void setCookiePrivate(string cookieName, string cookieValue, HttpContext httpContext, int expirationTimeInDays = -1)
        {

            if (expirationTimeInDays == -1)
            {
                expirationTimeInDays = 9999;
            }

            var cookieOptions = privateCookieOptions;
            cookieOptions.Expires = DateTime.Now.AddDays(expirationTimeInDays);

            httpContext.Response.Cookies.Append(cookieName, cookieValue, cookieOptions);
        }
    }
}
