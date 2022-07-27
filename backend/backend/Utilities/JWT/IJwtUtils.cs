using backend.Model;

namespace backend.Utilities.JWT
{
    public interface IJwtUtils
    {
        public string GenerateToken(User user);
        public int? ValidateJwtToken(string token);

        public Token RefreshToken { get; set; }


    }
}
