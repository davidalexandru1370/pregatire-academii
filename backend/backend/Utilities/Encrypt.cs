using System.ComponentModel;
using System.Security.Cryptography;

namespace backend.Utilities
{
    public class Encrypt
    {
        [Description("Encrypt a text using SHA256 algorithm")]
        public static string EncryptText(string text)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(text));
            }

            

            return "";
        }
    }
}
