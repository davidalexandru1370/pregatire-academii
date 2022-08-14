using backend.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace backend.Utilities.JWT
{
    public class JwtUtils : IJwtUtils
    {
        private EntitiesDbContext _context;
        private readonly AppSettings _appSettings;
        public JwtUtils(EntitiesDbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public Token GenerateJwtToken(User user, int expiredTimeInMinutes,string ipAddress)
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
            //return tokenHandler.WriteToken(token);
            return new Token()
            {
                Created = DateTime.Now,
                TokenValue = tokenHandler.WriteToken(token),
                CreatedByIp = ipAddress,
                Expires = tokenDescriptor.Expires.GetValueOrDefault(),
                ReasonRevoked = "",
                ReplacedByToken = "",
            };
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

            }
         
            return null;
        }

        public Token GenerateRefreshToken(string ipAddress, int expiredTimesInMinutes)
        {
            var refreshToken = new Token
            {
                Expires = DateTime.UtcNow.AddMinutes(expiredTimesInMinutes),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress,
                TokenValue = GenerateUniqueToken()
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
            token = token.Substring(0, token.Length - 1);
            bool isUnique = !_context.Tokens.Any(usedToken => usedToken.RefreshToken == token);

            if (isUnique == false)
            {
                return GenerateUniqueToken();
            }

            return token;
        }
    }
}
