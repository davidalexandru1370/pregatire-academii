using backend.Model;
using backend.Repository;
using backend.Unit_Of_Work;
using backend.Utilities;
using backend.Utilities.JWT;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using backend.Constants;
public interface IUserService
{
    public Task<AuthResult> Authentificate(User user);
    void RevokeToken(string token);
    public Task<AuthResult> Register(User user);
}


namespace backend.Services
{
    public class UserService : IUserService
    {
        private EntitiesDbContext _dataContext;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        private readonly IUnitOfWork<EntitiesDbContext> _unitOfWork;
        private readonly IUserRepository _userRepository;
        //private readonly AuthErrors _authErrors;
        private readonly ITokenRepository _tokenRepository;
        public UserService(EntitiesDbContext dataContext,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings,
            IUserRepository userRepository,
            ITokenRepository tokenRepository
            )
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
        }

        public async Task<AuthResult> Authentificate(User user)
        {
            var _user = _dataContext.Users.SingleOrDefault(x => x.Email == user.Email);
            AuthResult badResult = new AuthResult
            {
                result = false,
                AccessToken = String.Empty,
                RefreshToken = String.Empty,
                errors = new List<string>()
            };

            if (_user == null || BCrypt.Net.BCrypt.Verify(user.Password, _user.Password) == false)
            {
                badResult.errors.Add("Adresa de email sau parola gresita!");
                return badResult;
            }

            int AccessTokenExpireTimeInMinutes = _appSettings.AccessTokenTTL;
            int RefreshTokenExpireTimeInMinutes = _appSettings.RefreshTokenTTL;

            var jwtToken = _jwtUtils.GenerateJwtToken(user, AccessTokenExpireTimeInMinutes);
            var refreshToken = _jwtUtils.GenerateJwtToken(user, RefreshTokenExpireTimeInMinutes);

            refreshToken.UserId = _user.Id;

            try
            {
                await _tokenRepository.Add(refreshToken);
            }
            catch (Exception)
            {

                throw;
            }

            return new AuthResult()
            {
                result = true,
                AccessToken = jwtToken.TokenValue,
                RefreshToken = refreshToken.TokenValue,
                errors = new List<string>(),
            };

        }

        public async Task<AuthResult> Register(User user)
        {
            User existingUser;

            try
            {
                existingUser = await _userRepository.GetByEmail(user);
            }
            catch (RepositoryException repositoryException)
            {
                existingUser = null;
            }

            var badResult = new AuthResult()
            {
                AccessToken = string.Empty,
                errors = new List<string>(),
                RefreshToken = String.Empty,
                result = false
            };

            if (existingUser != null)
            {
                badResult.errors.Add("Exista deja un cont inregistrat cu acest email!");
                return badResult;
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Name = user.Email.Split("@")[0];
            try
            {
                var IsCreated = await _userRepository.Add(user);

                if (IsCreated != null)
                {
                    var jwtToken = _jwtUtils.GenerateJwtToken(user, _appSettings.AccessTokenTTL);
                    var refreshToken = _jwtUtils.GenerateJwtToken(user, _appSettings.RefreshTokenTTL);
                    refreshToken.UserId = user.Id;
                    _tokenRepository.Add(refreshToken);

                    return new AuthResult()
                    {
                        AccessToken = jwtToken.TokenValue,
                        RefreshToken = refreshToken.TokenValue,
                        result = true,
                        errors = new List<string>()
                    };
                }
            }
            catch (RepositoryException repositoryException)
            {
                badResult.errors.Add(repositoryException.StackTrace);
            }

            return badResult;
        }

        public void RevokeToken(string token)
        {
            throw new NotImplementedException();
        }

    }
}
