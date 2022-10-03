using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace backend.Model
{
    public class Email
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public IEnumerable<IFormFile>? Attachments { get; set; }

        private Email()
        {

        }

        private Email(string toEmail, string subject, string body, IEnumerable<IFormFile>? attachments)
        {
            ToEmail = toEmail;
            Subject = subject;
            Body = body;
            Attachments ??= attachments;
        }

        public class EmailFactory
        {
            public static Email ForgotPasswordEmail(string toEmail, IEnumerable<IFormFile>? attachments, Guid id, string name)
            {
                string message =
                    $"<table>" +
                        $"<tbody>" +
                        $"<td>" +
                        $"<tr>" +
                        $"<div style=\"font-family: sans-serif; \">" +
                        $"<h1>Reseteaza parola</h1>" +
                        $"<p>  Salut #name,</p>" +
                        $"<p>  Am primit solicitarea ta pentru resetarea parolei. Apasa pe butonul de mai jos pentru a-ti reseta parola.</p>" +
                        $"<p>  Daca nu ai cerut acest lucru, te rugam sa ignori acest e-mail!</p>" +
                                $"<div style=\"padding-top: 10px; padding-bottom: 10px\">" +
                             $"<a  href=\"#changePasswordLink \" style=\" padding: 1em; background-color:  blueviolet; color: white; border: none; border-radius: 10px; font-size: medium; cursor: pointer; text-decoration: none; font-family: sans-serif; \">" +
                                $"Reseteaza parola" +
                            $"</a>" +
                        $"</div>" +
                        $"<p>Daca butonul de mai sus nu functioneaza, apasa pe link-ul urmator: </p>" +
                        $"<a href=\"#changePasswordLink\"> #changePasswordLink </a>" +
                        $"</div>" +
                        $"</td>" +
                        $"</tr>" +
                        $"</tbody>" +
                    $"</table>";
                message = message.Replace("#name", name).Replace("#changePasswordLink", createForgotPasswordLink(id));
                return new Email(toEmail, "Resetarea parolei", message, Enumerable.Empty<IFormFile>());
            }

            public static Email Email(string toEmail, string subject, string body, IEnumerable<IFormFile>? attachments)
            {
                return new Email(toEmail, subject, body, attachments);
            }

            private static string createForgotPasswordLink(Guid id)
            {
                return "www.pregatire-academii.com/forgot-password?id=" + id.ToString();
            }
        }
    }
}
