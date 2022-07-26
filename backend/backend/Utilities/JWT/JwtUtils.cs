using backend.Model;

namespace backend.Utilities.JWT
{
    public class JwtUtils : IJwtUtils
    {
        public RefreshToken RefreshToken { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public string GenerateToken(User user)
        {
            throw new NotImplementedException();
        }

        public int? ValidateJwtToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}
