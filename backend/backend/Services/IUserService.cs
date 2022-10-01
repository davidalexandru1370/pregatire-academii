using backend.Model;

namespace backend.Services
{
    public interface IUserService
    {
        public Task<AuthResult> Authentificate(User user);
        void RevokeToken(string token);
        public Task<AuthResult> Register(User user);
        public Task<User?> GetByAccessToken(string accessToken);

        public Task<User> GetById(Guid userId);

        public Task<User> changePassword(string token, string email, string newPassword);

    }

}
