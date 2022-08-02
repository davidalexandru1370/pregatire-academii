namespace backend.Utilities
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public int RefreshTokenTTL { get; set; }
        public int AccessTokenTTL { get;set; }
    }
}
