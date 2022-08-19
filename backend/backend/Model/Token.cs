using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Token
    {
        [Key]
        public int Id { get; set; }
        
        public User User { get; set; }
        [ForeignKey("user")]
        public int UserId { get; set; }

        public string TokenValue { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
