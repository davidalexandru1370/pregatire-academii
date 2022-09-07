namespace backend.Utilities
{
    public interface ICookieUtilities
    {
        void setCookiePrivate(string cookieName, string cookieValue, HttpContext httpContext, int expirationTimeInDays = -1);
    }
}