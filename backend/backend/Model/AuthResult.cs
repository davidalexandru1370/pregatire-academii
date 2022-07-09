namespace backend.Model
{
    public class AuthResult
    {
        public string token { get; set; }
        public bool result { get; set; }
        public List<string> errors { get; set; }
    }
}
