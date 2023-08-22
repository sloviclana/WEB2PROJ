export default class ArticleDto {
    constructor(data) {
        this.Id = data.id;
        this.Name = data.name;
        this.Price = data.price; 
        this.Quanity = data.quanity; 
        this.Description = data.description; 
        this.Image = data.image;
        this.UserId = data.userId;
    }
}