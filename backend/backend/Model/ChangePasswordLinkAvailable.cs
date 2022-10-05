using MessagePack.Formatters;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class ChangePasswordLinkAvailable
    {
        [Key]
        [Required]
        public Guid pageId { get; set; }
        [Required]
        [Column(TypeName = "datetime")]
        public DateTime createdDate { get; set; }
        public User user { get; set; }
        [ForeignKey("User")]
        [Required]
        public Guid userId { get; set; }

    }
}
