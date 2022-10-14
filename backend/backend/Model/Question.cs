using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    [Table("Question")]
    public class Question
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        public string Text { get; set; }

        [JsonIgnore]
        [ForeignKey("QuizId")]
        public virtual Quiz? Quiz { get; set; }

        public virtual ICollection<Answer>? Answers { get; set; }
    }
}
