namespace backend.Model.DTOs
{
    public class RoomDTO
    {
        private Guid RoomId { get; set; }
        private DateTime IssuedRoomDate { get; set; }
        private Guid QuizId{ get; set; }

        public RoomDTO(Guid roomId, DateTime issuedRoomDate, Guid quizId)
        {
            RoomId = roomId;
            IssuedRoomDate = issuedRoomDate;
            QuizId = quizId;
        }
    }
}
