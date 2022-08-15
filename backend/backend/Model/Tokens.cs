using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Tokens
    {
        public int Id { get; set; }
        [ForeignKey("AccessToken")]
        public virtual Token? AccessTokenLink { get; set; }
        [ForeignKey("RefreshToken")]
        public virtual Token? RefreshTokenLink { get; set; }
        public User user { get; set; }
        [ForeignKey("user")]
        public int UserId { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
