namespace backend.Model
{
    public class QuizResponseDTO
    {
        public Guid Id { get; set; }
        public IEnumerable<Answer> Answers { get; set; }
        public int? Score = 0;
    }
}