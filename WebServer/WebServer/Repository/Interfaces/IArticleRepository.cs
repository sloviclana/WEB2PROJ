using WebServer.Models;

namespace WebServer.Repository.Interfaces
{
    public interface IArticleRepository
    {
        Article AddNew(Article article);
        Article GetArticle(long id);
        Article Edit(Article article);
        bool DeleteArticle(long id);
        List<Article> GetAll();
        List<Article> GetArticlesForOwner(long id);
    }
}
