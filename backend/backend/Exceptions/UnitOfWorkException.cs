namespace backend.Exceptions
{
    public class UnitOfWorkException : Exception
    {
        public UnitOfWorkException(string message) : base(message)
        {

        }

        public UnitOfWorkException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
