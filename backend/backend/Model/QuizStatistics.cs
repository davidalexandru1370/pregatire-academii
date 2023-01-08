using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class QuizStatistics
    {
        [Key]
        public Guid Id { get; set; }

        public virtual Quiz? Quiz { get; set; }
        [ForeignKey("Quiz")]
        public Guid QuizId { get; set; }

        public virtual User? User { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public int Score { get; set; }
    }
}