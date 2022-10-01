namespace backend.Model
{
    public class Email
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public IEnumerable<IFormFile> Attachments { get; set; }
    }
}
