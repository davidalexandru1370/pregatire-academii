using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
    public class User 
    {
        [Key]
        public Guid Id { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Required(ErrorMessage = "Email cannot be empty!")]
        [Column(TypeName = "nvarchar(250)")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password cannot be empty")]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string Name { get; set; } = string.Empty;
    }
}
