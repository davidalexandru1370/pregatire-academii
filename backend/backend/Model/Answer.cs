using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("Answer")]
    public class Answer
    {
        public Guid Id { get; set; }

        [JsonIgnore]
        [ForeignKey("QuestionId")]
        public Question Question { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
