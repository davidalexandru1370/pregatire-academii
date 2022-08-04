namespace backend.Repository
{
    public interface IRepository<T> where T : class
    {
        public void Add(T entity);
        public void Delete(T entity);
        public void Update(T old_entity, T new_entity);
        public Task<T> GetById(T entity);
    }

    public class RepositoryException : Exception
    {
        public RepositoryException() : base("") { }
        public RepositoryException(string message) : base(message) { }
    }
}