using backend.Constants;

namespace backend.Model
{

    public interface IEmailFactory
    {
        public Email GetEmail(Emails emailType, string to,string body, IEnumerable<IFormFile>? Attachements);
    }

    public class EmailFactory : IEmailFactory
    {
        public Email GetEmail(Emails emailType, string to, string body, IEnumerable<IFormFile>? Attachements)
        {
            switch (emailType)
            {
                case Emails.None:
                    return new Email();
                case Emails.ForgotPassword:
                    return new ForgotPasswordEmail(to, Enumerable.Empty<IFormFile>());
                default:
                    throw new Exception("Invalid provided email type!");
            }
        }
    }
}
