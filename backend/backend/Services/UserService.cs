using backend.Model;
using backend.Repository;
using backend.Unit_Of_Work;
using backend.Utilities;
using backend.Utilities.JWT;
using BCrypt.Net;
using Microsoft.Extensions.Options;

public interface IUserService
{
    public Task<AuthResult> Authentificate(User user, string ipAddress);
    public Task<AuthResult> RefreshToken(string token, string ipAddress);

    void RevokeToken(string token, string ipAddress);

    public Task<AuthResult> Register(User user, string ipAddress);
}


namespace backend.Services
{
    public class UserService : IUserService
    {
        private EntitiesDbContext _dataContext;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        private readonly IRepository<Tokens> _tokensRepository;
        private readonly IUnitOfWork<EntitiesDbContext> _unitOfWork;

        public UserService(EntitiesDbContext dataContext, IJwtUtils jwtUtils, IOptions<AppSettings> appSettings, IRepository<Tokens> tokensRepository)
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
            _tokensRepository = tokensRepository;
        }

        public async Task<AuthResult> Authentificate(User user, string ipAddress)
        {
            var _user = _dataContext.Users.SingleOrDefault(x => x.email == user.email);
            AuthResult badResult = new AuthResult
            {
                result = false,
                AccessToken = String.Empty,
                RefreshToken = String.Empty,
                errors = new List<string>()
            };

            //if (_user == null || _user.password != BCrypt.Net.BCrypt.HashPassword(user.password))
            if (_user == null || BCrypt.Net.BCrypt.Verify(user.password, _user.password) == false)
            {
                badResult.errors.Add("Adresa de email sau parola gresita!");
                return badResult;
            }

            int AccessTokenExpireTimeInMinutes = 15;
            int RefreshTokenExpireTimeInMinutes = 7 * 24 * 60;

            var jwtToken = _jwtUtils.GenerateJwtToken(user, AccessTokenExpireTimeInMinutes, ipAddress);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress, RefreshTokenExpireTimeInMinutes);

            /*await _dataContext.Tokens.AddAsync(new Tokens()
            {
                AccessToken = jwtToken.TokenValue,
                RefreshToken = refreshToken.TokenValue,
                UserIdFK = user.id,
            });*/

            // await _dataContext.TokenDetails.AddAsync(refreshToken);

            await _dataContext.SaveChangesAsync();

            return new AuthResult()
            {
                result = true,
                AccessToken = jwtToken.TokenValue,
                RefreshToken = refreshToken.TokenValue,
                errors = new List<string>(),
            };
        }

        public async Task<AuthResult> Register(User user, string ipAddress)
        {
            var existingUser = _dataContext.Users.FirstOrDefault(x => x.email == user.email); ;
            var badResult = new AuthResult()
            {
                AccessToken = string.Empty,
                errors = new List<string>(),
                RefreshToken = String.Empty,
                result = false
            };

            if (existingUser != null)
            {
                badResult.errors.Add("Adresa de email inregistrata!");
                return badResult;
            }

            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
            user.name = user.email.Split("@")[0];
            
            var IsCreated = await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();

            if (IsCreated != null)
            {
                var jwtToken = _jwtUtils.GenerateJwtToken(user, _appSettings.AccessTokenTTL, ipAddress);
                var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress, _appSettings.RefreshTokenTTL);

                await _dataContext.TokenDetails.AddAsync(jwtToken);

                await _dataContext.TokenDetails.AddAsync(refreshToken);

                await _dataContext.Tokens.AddAsync(new Tokens()
                {
                    AccessToken = jwtToken.TokenValue,
                    RefreshToken = refreshToken.TokenValue,
                    UserId = user.id,
                });

                await _dataContext.SaveChangesAsync();

                return new AuthResult()
                {
                    AccessToken = jwtToken.TokenValue,
                    RefreshToken = refreshToken.TokenValue,
                    result = true,
                    errors = new List<string>()
                };
            }

            badResult.errors.Add("Unknown problem");
            return badResult;
        }

        public Task<AuthResult> RefreshToken(string token, string ipAddress)
        {
            throw new NotImplementedException();
        }

        public void RevokeToken(string token, string ipAddress)
        {
            _dataContext.TokenDetails.Remove(new Token() { TokenValue = token });
        }

        //private async User GetUserAsyncByRefreshToken(string RefreshToken)
        //{
        //var user = _dataContext.
        //}


    }
}
