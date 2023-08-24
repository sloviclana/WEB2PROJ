using WebServer.Models;

namespace WebServer.Repository.Interfaces
{
    public interface IOrderRepository
    {

        Order AddNew(Order order);
        List<Order> GetAllFromUser(long id);

        List<Order> GetAllForSalesman(long id);
        List<Order> GetAll();
        Order Decline(Order order);
        Order Find(long id);
        Order EditOrderAddCommentRated(Order order);
        Task<Order> FindAsync(long id);
        Task AddNewAsync(Order order);

        void DeleteAsync(Order o);

        //OrderArticle AddNew(OrderArticle article);

    }
}
