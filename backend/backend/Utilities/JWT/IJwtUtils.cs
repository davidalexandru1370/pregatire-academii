using backend.Model;

namespace backend.Utilities.JWT
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(User user, int expiredTimeInMinutes);
        public int? ValidateJwtToken(string token);

        public Token GenerateRefreshToken(string ipAddress, int expiredTimesInMinutes);
    }
}
