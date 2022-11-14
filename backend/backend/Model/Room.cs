using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; set; }

        public User User { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [Column("Datetime")]
        public DateTime IssuedRoom { get; set; }
    }
}
