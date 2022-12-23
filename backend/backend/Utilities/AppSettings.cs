namespace backend.Utilities
{
    public class AppSettings
    {
        public string? Secret { get; set; }
        public int RefreshTokenTTL { get; set; }
        public int AccessTokenTTL { get; set; }
        public string EmailAddress { get; set; }
        public string EmailHost { get; set; }
        public int EmailPort { get; set; }
        public string EmailUsername { get; set; }
        public string EmailPassword { get; set; }
    }
}
