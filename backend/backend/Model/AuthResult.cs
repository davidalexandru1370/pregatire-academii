namespace backend.Model
{
    public class AuthResult
    {
        public string AccessToken { get; set; } = String.Empty;
        public string RefreshToken { get; set; } = String.Empty;
        public bool result { get; set; } = false;
        public List<string> errors { get; set; } = new List<string>();
    }
}
