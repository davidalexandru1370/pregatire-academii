using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public class Token
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string? JWTToken { get; set; }
        [Column(TypeName = "Datetime")]

        public DateTime Expires { get; set; }

        [Column(TypeName = "Datetime")]
        public DateTime Created { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? CreatedByIp { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? Revoked { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? RevokedByIp { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ReplacedByToken { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ReasonRevoked { get; set; }

        [NotMapped]
        public bool IsExpired => DateTime.UtcNow >= Expires;

        [NotMapped]
        public bool IsRevoked => Revoked != null;

        [NotMapped]
        public bool IsActive => IsRevoked == false && IsExpired == false;
    }
}
