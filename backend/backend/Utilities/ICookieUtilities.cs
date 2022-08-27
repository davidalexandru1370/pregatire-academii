namespace backend.Utilities
{
    public interface ICookieUtilities
    {
        void setCookiePrivate(string cookieName, string cookieValue, int expirationTimeInDays = -1);
    }
}