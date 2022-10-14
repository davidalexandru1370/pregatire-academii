using backend.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("Quiz")]
    public class Quiz
    {

        [Key]
        public Guid Id { get; set; }
        public Category Category { get; set; }

        public ICollection<Question>? Question { get; set; }

    }
}

