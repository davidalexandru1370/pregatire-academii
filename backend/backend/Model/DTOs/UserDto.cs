using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.DTOs
{
    public class UserDto
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Required(ErrorMessage = "Email cannot be empty!")]
        [Column(TypeName = "nvarchar(250)")]
        public string email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password cannot be empty")]
        [Column(TypeName = "nvarchar(250)")]
        public string password { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string name { get; set; } = string.Empty;
    }
}
