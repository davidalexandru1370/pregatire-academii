using backend.Model;
using backend.Utilities;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace backend.Services
{
    public class EmailService : IEmailService
    {
        private MimeMessage _email = new MimeMessage();
        private readonly AppSettings _appSettings;
        public EmailService(IOptions<AppSettings> appSettings)
        {

            _appSettings = appSettings.Value;
            _email.From.Add(new MailboxAddress("da", "no-reply@pregatire-academii.com"));
        }


        public void sendEmail(Email email)
        {
            {
                try
                {

                    _email.Body = new TextPart() { Text = email.Body };
                    _email.Subject = email.Subject;
                    _email.To.Add(MailboxAddress.Parse(email.ToEmail));

                    using var smtp = new SmtpClient();
                    smtp.Connect(_appSettings.EmailHost, 587, false);
                    smtp.Authenticate(_appSettings.EmailUsername, _appSettings.EmailPassword);
                    smtp.Send(_email);
                    smtp.Disconnect(true);

                }
                catch (Exception)
                {
                    throw;
                }

            }
        }
    }
}
