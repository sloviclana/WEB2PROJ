using WebServer.Models;
using WebServer.Repository.Interfaces;

namespace WebServer.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        public Article AddNew(Article article)
        {
            throw new NotImplementedException();
        }

        public bool DeleteArticle(long id)
        {
            throw new NotImplementedException();
        }

        public Article Edit(Article article)
        {
            throw new NotImplementedException();
        }

        public List<Article> GetAll()
        {
            throw new NotImplementedException();
        }

        public Article GetArticle(long id)
        {
            throw new NotImplementedException();
        }

        public List<Article> GetArticlesForOwner(long id)
        {
            throw new NotImplementedException();
        }
    }
}
