using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Tokens
    {
        [ForeignKey("AccessToken")]
        public virtual Token? AccessTokenLink { get; set; }
        [ForeignKey("RefreshToken")]
        public virtual Token? RefreshTokenLink { get; set; }
        public User user { get; set; }
        [Key]
        [ForeignKey("user")]
        public int UserId { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
