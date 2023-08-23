export default class OrderShowDto {
    constructor(data) {
        this.Id = data.id;
        this.Articles = data.articles;
        this.UserId = data.userId;
        this.Comment = data.comment;
        this.DeliveryAddress = data.deliveryAddress;
        this.Price = data.price;
        this.OrderTime = data.orderTime;
        this.DeliveryTime = data.deliveryTime;
        this.IsDelevered = data.isDelevered;
    }
}