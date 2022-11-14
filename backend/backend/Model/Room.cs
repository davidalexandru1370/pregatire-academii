using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; }

        public User User { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; }

        public DateTime IssuedRoom { get; set; }

        public string SerializedQuiz { get; set; }
    }
}
