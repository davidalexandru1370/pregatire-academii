namespace backend.Model
{
    public class QuizDTO
    {
        public Guid Id { get; set; }
        public IEnumerable<Question> Questions { get; set; }
    }
}