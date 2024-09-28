using Repository.Contracts;

namespace Repository
{
    internal sealed class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void Save() => _repositoryContext.SaveChanges();
        
    }
}
