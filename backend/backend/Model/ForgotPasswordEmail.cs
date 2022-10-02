namespace backend.Model
{
    public class ForgotPasswordEmail : Email
    {
        public ForgotPasswordEmail(string toEmail, IEnumerable<IFormFile>? attachments) : base(toEmail, attachments)
        {
            Body = "changed from inherited";
        }
    }
}
