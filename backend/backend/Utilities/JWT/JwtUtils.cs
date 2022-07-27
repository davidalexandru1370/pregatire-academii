using backend.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace backend.Utilities.JWT
{
    public class JwtUtils : IJwtUtils
    {
        private EntitiesDbContext _context;
        private readonly AppSettings _appSettings;
        public JwtUtils(EntitiesDbContext context)
        {
            _context = context;
        }

        public Token RefreshToken { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public string GenerateToken(User user, int expiredTimeInMinutes)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(expiredTimeInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public int? ValidateJwtToken(string token)
        {
            if (token == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                return userId;

            }
            catch (Exception)
            {
                return null;
            }
        }

        public Token GenerateRefreshToken(string ipAddress, int expiredTimesInMinutes)
        {
            var refreshToken = new Token
            {

                Expires = DateTime.UtcNow.AddMinutes(expiredTimesInMinutes),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress,
            };

            return refreshToken;

        }

        string GenerateUniqueToken()
        {
            StringBuilder builder = new StringBuilder();

            Enumerable.Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(11)
                .ToList()
                .ForEach(e => builder.Append(e));

            var token = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(builder.ToString()));
            bool isUnique = !_context.RefreshTokens.Any(usedToken => usedToken.JWTToken == token);

            if (isUnique == false)
            {
                return GenerateUniqueToken();
            }

            return token;
        }

        public string GenerateToken(User user)
        {
            throw new NotImplementedException();
        }
    }
}
