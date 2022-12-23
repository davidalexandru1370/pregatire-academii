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
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
