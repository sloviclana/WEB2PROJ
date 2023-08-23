namespace WebServer.Dto
{
    public class OrderShowDto
    {
        public long Id { get; set; }
        public List<OrderArticleDto> Articles { get; set; }

        public long UserId { get; set; }

        public string Comment { get; set; }

        public string DeliveryAddress { get; set; }

        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsDelevered { get; set; }

        public double Price { get; set; }
    }
}
