﻿using backend.Model;
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
        private readonly IUnitOfWork<EntitiesDbContext> _unitOfWork;
        private readonly IUserRepository _userRepository;

        public UserService(EntitiesDbContext dataContext,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings,
            IUserRepository userRepository
            )
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
        }

        public async Task<AuthResult> Authentificate(User user, string ipAddress)
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

            var jwtToken = _jwtUtils.GenerateJwtToken(user, AccessTokenExpireTimeInMinutes, ipAddress);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress, RefreshTokenExpireTimeInMinutes);

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
            User existingUser;
            try
            {
                existingUser = await _userRepository.GetByEmail(user);
            }
            catch (RepositoryException repositoryException)
            {
                throw;
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
                badResult.errors.Add("Adresa de email inregistrata!");
                return badResult;
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Name = user.Email.Split("@")[0];
            try
            {
                var IsCreated = await _userRepository.Add(user);
                //await _dataContext.SaveChangesAsync();

                if (IsCreated != null)
                {
                    var jwtToken = _jwtUtils.GenerateJwtToken(user, _appSettings.AccessTokenTTL, ipAddress);
                    var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress, _appSettings.RefreshTokenTTL);


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
                badResult.errors.Add(repositoryException.StackTrace) ;
            }

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
    }
}
