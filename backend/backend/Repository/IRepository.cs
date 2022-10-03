namespace backend.Repository
{
    public interface IRepository<T> where T : class
    {
        public void Add(T entity);
        public void Delete(T entity);
        public void Update(Guid oldEntityId, T newEntity);
        public Task<T> GetById(Guid id);
    }

    public class RepositoryException : Exception
    {
        public RepositoryException() : base("") { }
        public RepositoryException(string message) : base(message) { }
    }
}