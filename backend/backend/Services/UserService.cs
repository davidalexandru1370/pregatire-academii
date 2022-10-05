using backend.Model;
using backend.Repository;
using backend.Unit_Of_Work;
using backend.Utilities;
using backend.Utilities.JWT;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using backend.Constants;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private EntitiesDbContext _dataContext;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;
        private readonly IChangePasswordAvailableRepository _changePasswordAvailableRepository;
        private IEmailService _emailService;

        public UserService(EntitiesDbContext dataContext,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings,
            IUserRepository userRepository,
            ITokenRepository tokenRepository,
            IEmailService emailService,
            IChangePasswordAvailableRepository changePasswordAvailableRepository
            )
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
            _emailService = emailService;
            _changePasswordAvailableRepository = changePasswordAvailableRepository;
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

            var jwtToken = _jwtUtils.GenerateJwtToken(_user, AccessTokenExpireTimeInMinutes);
            var refreshToken = _jwtUtils.GenerateJwtToken(_user, RefreshTokenExpireTimeInMinutes);

            try
            {
                //await _tokenRepository.Add();
            }
            catch (Exception)
            {

                throw;
            }

            return new AuthResult()
            {
                result = true,
                AccessToken = jwtToken,
                RefreshToken = refreshToken,
                errors = new List<string>(),
            };

        }

        public async Task<AuthResult> Register(User user)
        {
            User existingUser;

            try
            {
                existingUser = await _userRepository.GetByEmail(user.Email);
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
                    //refreshToken.UserId = user.Id;
                    //_tokenRepository.Add(refreshToken);

                    return new AuthResult()
                    {
                        AccessToken = jwtToken,
                        RefreshToken = refreshToken,
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

        public async Task<User?> GetById(Guid userId)
        {
            try
            {
                return await _userRepository.GetById(userId);
            }
            catch (RepositoryException repositoryException)
            {
                throw repositoryException;
            }
        }

        public async Task<User?> GetByAccessToken(string accessToken)
        {
            var userId = _jwtUtils.ValidateJwtToken(accessToken);
            if (userId is not null)
            {
                try
                {
                    return await GetById(userId.Value);
                }
                catch (RepositoryException repositoryException)
                {
                    throw repositoryException;
                }
            }
            return null;
        }

        public async Task<User> GeneratePasswordResetLink(string email)
        {
            User? user = null;

            try
            {
                user = await _userRepository.GetByEmail(email);
            }

            catch (RepositoryException repositoryException)
            {
                throw repositoryException;
            }

            if (user is not null)
            {
                ChangePasswordLinkAvailable? alreadyExistingLink = new ChangePasswordLinkAvailable()
                {
                    createdDate = DateTime.Now,
                    userId = user.Id
                };

                try
                {
                    alreadyExistingLink = await _changePasswordAvailableRepository.GetByUserId(user.Id);
                }
                catch (RepositoryException)
                {
                    alreadyExistingLink.userId = Guid.Empty;
                }

                if (alreadyExistingLink.userId != Guid.Empty)
                {
                    Guid oldId = alreadyExistingLink.pageId;
                    alreadyExistingLink = new ChangePasswordLinkAvailable()
                    {
                        createdDate = DateTime.Now,
                        userId = user.Id
                    };
                    await _changePasswordAvailableRepository.Update(oldId, alreadyExistingLink);
                }
                else
                {
                    alreadyExistingLink.userId = user.Id;
                    await _changePasswordAvailableRepository.Add(alreadyExistingLink);
                }

                _emailService.sendEmail(Email.EmailFactory.ForgotPasswordEmail(email, Enumerable.Empty<IFormFile>(), alreadyExistingLink.pageId, user.Name));
            }

            return user!;

        }

    }
}