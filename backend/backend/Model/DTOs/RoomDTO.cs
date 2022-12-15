namespace backend.Model.DTOs
{
    public class RoomDTO
    {
        public Guid RoomId { get; set; }
        public DateTime IssuedRoomDate { get; set; }
        public Guid QuizId{ get; set; }

       
    }
}
