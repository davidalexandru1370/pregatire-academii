using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Token
    {
        [Key]
        public Guid Id { get; set; }
        
        public User User { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public string TokenValue { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
