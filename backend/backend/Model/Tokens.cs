using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Tokens
    {
        [ForeignKey("TokenValue")]
        public Token token { get; set; }
        [ForeignKey("id")]
        public User user { get; set; }
        [Key]
        [Display(Name ="User")]
        public virtual int UserIdFK { get; set; }

        [Display(Name ="Token")]
        public virtual string? AccessToken { get; set; }
        [Display(Name = "Token")]
        public virtual string? RefreshToken { get; set; }
    }
}
