namespace backend.Repository
{
    public interface IRepository<T> where T : class
    {
        public Task Add(T entity);
        public Task Delete(T entity);
        public Task Update(Guid oldEntityId, T newEntity);
        public Task<T> GetById(Guid id);
    }

    public class RepositoryException : Exception
    {
        public RepositoryException() : base("") { }
        public RepositoryException(string message) : base(message) { }
    }
}