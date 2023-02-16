namespace backend.Exceptions
{
    public class InvalidEntityException : Exception
    {
        public InvalidEntityException(string message) : base(message)
        {

        }

        public InvalidEntityException()
        {

        }
    }
}