using backend.Model;

namespace backend.Services.Interfaces
{
    public interface IEmailService
    {
        public void sendEmail(Email email);
    }
}
