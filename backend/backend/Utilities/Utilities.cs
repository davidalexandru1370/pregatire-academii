namespace backend.Utilities
{
    public static class Utilities
    {
        public static DateTime ConvertFromUnixTimeStamp(int amount)
        {
            DateTime startDate = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            startDate = startDate.AddSeconds(amount).ToLocalTime();
            return startDate;
        }
    }
}
