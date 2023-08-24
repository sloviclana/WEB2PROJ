using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Dto;
using WebServer.Services;
using WebServer.Services.Interfaces;

namespace WebServer.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;
        IWebHostEnvironment webHostEnvironment;

        public ArticlesController(IArticleService articleService, IWebHostEnvironment webHostEnvironment)
        {
            _articleService = articleService;
            //_authService = authService;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("allArticles")]
        public IActionResult GetAll()
        {
            return Ok(_articleService.GetAll());
        }

        [HttpPost("newArticle")]
        public IActionResult AddNewArticle([FromBody] ArticleDto articleDto)
        {
            return Ok(_articleService.AddNew(articleDto));
        }

        

    }
}
