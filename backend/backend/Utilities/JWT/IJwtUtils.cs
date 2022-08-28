using backend.Model;

namespace backend.Utilities.JWT
{
    public interface IJwtUtils
    {
        public Token GenerateJwtToken(User user, int expiredTimeInMinutes);
        public Guid? ValidateJwtToken(string token);
        public string GetFieldFromToken(string token, string field);
        public Token RotateRefreshToken(string oldToken);
        public DateTime GetExpirationDate(string token);

    }
}
