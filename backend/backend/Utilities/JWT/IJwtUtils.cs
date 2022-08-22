using backend.Model;

namespace backend.Utilities.JWT
{
    public interface IJwtUtils
    {
        public Token GenerateJwtToken(User user, int expiredTimeInMinutes);
        public Guid? ValidateJwtToken(string token);
        public Token GenerateRefreshToken( int expiredTimesInMinutes);
    }
}
