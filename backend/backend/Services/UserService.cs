﻿using backend.Model;
using backend.Utilities;
using backend.Utilities.JWT;
using BCrypt.Net;

public interface IUserService
{
    public  Task<AuthResult> Authentificate(User user, string ipAdress);
    public Task<AuthResult> RefreshToken(string token, string ipAddress);

    void RevokeToken(string token, string ipAddress);

}


namespace backend.Services
{
    public class UserService : IUserService
    {
        private EntitiesDbContext _dataContext;
        private IJwtUtils _jwtUtils;
        private readonly IConfiguration _appSettings;

        public UserService(EntitiesDbContext dataContext, IJwtUtils jwtUtils, IConfiguration appSettings)
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings;
        }

        public async Task<AuthResult> Authentificate(User user, string ipAddress)
        {
            var _user = _dataContext.Users.SingleOrDefault(x => x.email == user.email);

            if (_user == null || BCrypt.Net.BCrypt.HashPassword(_user.password) != BCrypt.Net.BCrypt.HashPassword(user.email))
            {
                return new AuthResult()
                {
                    result = false,
                    AccessToken = String.Empty,
                    RefreshToken = String.Empty,
                    errors = new List<string>()
                    {
                        "Password is incorrect"
                    }
                };
            }

            int AccessTokenExpireTimeInMinutes = 15;
            int RefreshTokenExpireTimeInMinutes = 7 * 24 * 60;

            var jwtToken = _jwtUtils.GenerateJwtToken(user, AccessTokenExpireTimeInMinutes,ipAddress);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress, RefreshTokenExpireTimeInMinutes);

            await _dataContext.Tokens.AddAsync(new Tokens()
            {
                AccessToken = jwtToken.TokenValue,
                RefreshToken = refreshToken.TokenValue,
                UserIdFK = user.id,
            });

            await _dataContext.TokenDetails.AddAsync(refreshToken);
           

            await _dataContext.SaveChangesAsync();

            return new AuthResult()
            {
                result = true,
                AccessToken = jwtToken.TokenValue,
                RefreshToken = refreshToken.TokenValue,
                errors = new List<string>(),
            };
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
