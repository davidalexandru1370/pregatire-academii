using backend.Model;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        public Task<AuthResult> Authentificate(User user);
        public Task<AuthResult> Register(User user);
        public Task<User?> GetByAccessToken(string accessToken);
        public Task<User?> GetById(Guid userId);
        public Task<User> GeneratePasswordResetLink(string email);
        public Task ValidateForgotPasswordPageId(string pageId);
        public Task ChangePassword(string pageId, string newPassword);
    }

}
