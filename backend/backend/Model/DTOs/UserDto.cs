using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.DTOs
{
    public class UserDto
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Required(ErrorMessage = "Email cannot be empty!")]
        public string email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password cannot be empty")]
        public string password { get; set; } = string.Empty;

        [Required]
        public string? name { get; set; } = string.Empty;
    }
}
