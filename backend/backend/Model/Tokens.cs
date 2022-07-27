using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Tokens
    {
        [ForeignKey("")]
        public int UserId { get; set; }
        public int IdAccessToken { get; set; }
        public  int IdRefreshToken { get; set; }
    }
}
