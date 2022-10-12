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

        public string GenerateJwtToken(User user, int expiredTimeInMinutes)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("Id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(expiredTimeInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public Guid? ValidateJwtToken(string token)
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
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);

                return userId;

            }
            catch (Exception)
            {

            }

            return null;
        }

        public string GetFieldFromToken(string token, string field)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(token);

            var tokens = jsonToken as JwtSecurityToken;

            //return Guid.Parse(tokens.Claims.First(x => x.Type == "Id").Value);
            return tokens.Claims.First(x => x.Type == field).Value;
        }

        public string RotateRefreshToken(string oldToken)
        {
            DateTime expirationTime = GetExpirationDate(oldToken);
            int differenceInMinutes = ((int)(expirationTime - DateTime.Now).TotalMinutes);
            Guid userId = Guid.Parse(GetFieldFromToken(oldToken, "Id"));
            User tempUser = new User()
            {
                Id = userId
            };
            string newRefreshToken = GenerateJwtToken(tempUser, differenceInMinutes);
            return newRefreshToken;
        }

        public DateTime GetExpirationDate(string token)
        {
            return Utilities.ConvertFromUnixTimeStamp(Int32.Parse(GetFieldFromToken(token, "exp")));
        }

    }
}
