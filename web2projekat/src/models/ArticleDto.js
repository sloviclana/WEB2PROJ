export default class ArticleDto {
    constructor(data) {
        this.Id = data.id,
        this.Name = data.name,
        this.Price = data.price, 
        this.Quantity = data.quantity, 
        this.Description = data.description, 
        this.Image = data.image,
        this.UserId = data.userId
    }
}