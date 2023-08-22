using WebServer.Infrastructure;
using WebServer.Models;
using WebServer.Repository.Interfaces;

namespace WebServer.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private WebShopDbContext _webShopDbContext;

        public ArticleRepository(WebShopDbContext webShopDbContext)
        {
            _webShopDbContext = webShopDbContext;
        }   

        public Article AddNew(Article article)
        {
            _webShopDbContext.Articles.Add(article);   
            _webShopDbContext.SaveChanges();
            return article;
        }

        public bool DeleteArticle(long id)
        {
            var article = _webShopDbContext.Articles.FirstOrDefault(a => a.Id == id);
            if (article != null)
            {
                return false;
            }
            _webShopDbContext.Articles.Remove(article);
            _webShopDbContext.SaveChanges();
            return true;
        }

        public Article Edit(Article article)
        {
            long id = article.Id;
            _webShopDbContext.Articles.FirstOrDefault(a => a.Id == id).Quanity = article.Quanity;
            _webShopDbContext.SaveChanges();
            return article;
        }

        public List<Article> GetAll()
        {
            return _webShopDbContext.Articles.ToList();
        }

        public Article GetArticle(long id)
        {
            return _webShopDbContext.Articles.FirstOrDefault(a => a.Id == id);
        }

        public List<Article> GetArticlesForOwner(long id)
        {
            var articles = new List<Article>();

            foreach(Article a in _webShopDbContext.Articles)
            {
                if(a.UserId == id)
                    articles.Add(a);
            }

            return articles;
        }
    }
}
