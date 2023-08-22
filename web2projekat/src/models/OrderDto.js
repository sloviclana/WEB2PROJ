export default class OrderDto {
    constructor(articles, userId, comment, deliveryAddress, price) {
        this.Articles = articles;
        this.UserId = userId;
        this.Comment = comment;
        this.DeliveryAddress = deliveryAddress;
        this.Price = price;
    }

    addArticle(article) {
        this.articles.push(article);
    }
}