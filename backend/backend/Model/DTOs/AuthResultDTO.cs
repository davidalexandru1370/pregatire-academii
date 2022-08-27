namespace backend.Model.DTOs
{
    public class AuthResultDTO
    {
        public bool result { get; set; } = false;
        public List<string> errors { get; set; } = new List<string>();

    }
}
