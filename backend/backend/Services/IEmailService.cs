using backend.Model;

namespace backend.Services
{
    public interface IEmailService
    {
        public void sendEmail(Email email);
    }
}
