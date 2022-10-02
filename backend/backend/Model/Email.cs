namespace backend.Model
{
    public class Email
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public IEnumerable<IFormFile>? Attachments { get; set; }

        public Email()
        {

        }

        public Email(string toEmail, string subject, string body, IEnumerable<IFormFile>? attachments)
        {
            ToEmail = toEmail;
            Subject = subject;
            Body = body;
            Attachments ??= attachments;
        }

        public Email(string toEmail, IEnumerable<IFormFile>? attachments)
        {
            ToEmail = toEmail;
            Attachments ??= attachments;
        }
    }
}
