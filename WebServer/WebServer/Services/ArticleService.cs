using AutoMapper;
using WebServer.Dto;
using WebServer.Models;
using WebServer.Repository.Interfaces;
using WebServer.Services.Interfaces;

namespace WebServer.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        IWebHostEnvironment webHostEnvironment;

        public ArticleService(IArticleRepository articleRepository, IUserRepository userRepository, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _articleRepository = articleRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            this.webHostEnvironment = webHostEnvironment;
        }

        public ArticleDto AddNew(ArticleDto article)
        {
            Article articleNew = _mapper.Map<Article>(article);
            Article a = _articleRepository.AddNew(articleNew);
            ArticleDto articleEditDto = _mapper.Map<ArticleDto>(a);
            return articleEditDto;
        }

        public bool Delete(long Id)
        {
            if (_articleRepository.DeleteArticle(Id))
                return true;
            else
                return false;
        }

        public ArticleDto Edit(ArticleDto article)
        {
            Article article1 = _mapper.Map<Article>(article);
            _articleRepository.Edit(article1);
            return article;
        }

        public ArticleDto Get(int Id)
        {
            Article article = _articleRepository.GetArticle(Id);
            ArticleDto articleDto = _mapper.Map<ArticleDto>(article);
            return articleDto;
        }

        public List<ArticleDto> GetAll()
        {
            List<ArticleDto> articleDtos = new List<ArticleDto>();
            foreach (Article a in _articleRepository.GetAll())
            {
                if (a.Quanity != 0)
                {
                    articleDtos.Add(_mapper.Map<ArticleDto>(a));
                }
            }
            return articleDtos;
        }

        public List<ArticleDto> GetAllForUser(int id)
        {
            List<ArticleDto> articleDtos = new List<ArticleDto>();
            foreach (Article a in _articleRepository.GetAll())
            {
                if (a.UserId == id)
                {
                    articleDtos.Add(_mapper.Map<ArticleDto>(a));
                }
            }
            return articleDtos;
        }

        public byte[] GetImage(int id)
        {
            try
            {
                ArticleDto article = Get(id);
                var path = Path.Combine(webHostEnvironment.ContentRootPath, "articlesImage", id + "");
                var imageBytes = System.IO.File.ReadAllBytes(path);
                return imageBytes;
            }
            catch
            {
                return new byte[0];
            }
        }

        public async Task<bool> UploadImage(IFormFile image, int id)
        {
            try
            {
                ArticleDto article = Get(id);
                var filePath = Path.Combine(webHostEnvironment.ContentRootPath, "articlesImage", id + "");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
