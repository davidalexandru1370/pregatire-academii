using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Model.DTOs;
namespace backend.Model
{
    public class User : UserDto
    {
        [Key]
        public int id { get; set; }
       
    }
}
