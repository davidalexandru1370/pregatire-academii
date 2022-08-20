using backend.Model;

namespace backend.Utilities.JWT
{
    public interface IJwtUtils
    {
        public Token GenerateJwtToken(User user, int expiredTimeInMinutes,string ipAddress);
        public Guid? ValidateJwtToken(string token);

        public Token GenerateRefreshToken(string ipAddress, int expiredTimesInMinutes);
    }
}
