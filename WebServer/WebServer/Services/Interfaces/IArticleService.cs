using WebServer.Dto;

namespace WebServer.Services.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddNew(ArticleDto article);
        ArticleDto Get(int Id);
        ArticleDto Edit(ArticleDto article);
        bool Delete(long Id);
        List<ArticleDto> GetAll();
        List<ArticleDto> GetAllForUser(int id);
        Task<bool> UploadImage(IFormFile image, int id);
        byte[] GetImage(int id);
    }
}
