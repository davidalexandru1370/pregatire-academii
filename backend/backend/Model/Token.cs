using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public class Token
    {
        
        [Key]
        public string? TokenValue { get; set; }

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
        [JsonIgnore]
        public bool IsExpired => DateTime.UtcNow >= Expires;

        [NotMapped]
        [JsonIgnore]
        public bool IsRevoked => Revoked != null;

        [NotMapped]
        [JsonIgnore]
        public bool IsActive => IsRevoked == false && IsExpired == false;
    }
}
