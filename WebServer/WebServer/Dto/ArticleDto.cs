using System.ComponentModel.DataAnnotations;

namespace WebServer.Dto
{
    public class ArticleDto
    {
        [Required]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quanity { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        [Required]
        public long UserId { get; set; }
    }
}
