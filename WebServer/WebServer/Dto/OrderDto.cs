namespace WebServer.Dto
{
    public class OrderDto
    {
        public List<OrderArticleDto> Articles { get; set; }
        
        public long UserId { get; set; }

        public string Comment { get; set; }

        public string DeliveryAddress { get; set; }

        public double Price { get; set; }
    }
}
