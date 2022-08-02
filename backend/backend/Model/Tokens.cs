using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Tokens
    {
        [ForeignKey("TokenValue")]
        public virtual Token token { get; set; }
        [ForeignKey("id")]
        public virtual User user { get; set; }
        [Key]
        [Display(Name ="User")]
        public virtual int UserIdFK { get; set; }

        [Display(Name ="Token")]
        public virtual string? AccessToken { get; set; }
        [Display(Name = "Token")]
        public virtual string? RefreshToken { get; set; }
    }
}
