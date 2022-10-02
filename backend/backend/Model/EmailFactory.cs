using backend.Constants;

namespace backend.Model
{

    public interface IEmailFactory
    {
        public Email GetEmail(Emails emailType, string to,string subject,string body, IEnumerable<IFormFile>? attachements);
    }

    public class EmailFactory : IEmailFactory
    {
        public Email GetEmail(Emails emailType, string to,string subject,string body, IEnumerable<IFormFile>? attachements)
        {
            switch (emailType)
            {
                case Emails.None:
                    return new Email(to,subject,body,attachements);
                case Emails.ForgotPassword:
                    return new ForgotPasswordEmail(to, Enumerable.Empty<IFormFile>());
                default:
                    throw new Exception("Invalid provided email type!");
            }
        }
    }
}
