using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class User
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string email { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string password { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(250)")]
        public string name { get; set; } = string.Empty;
    }
}
