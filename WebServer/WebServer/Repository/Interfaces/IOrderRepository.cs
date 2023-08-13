using WebServer.Models;

namespace WebServer.Repository.Interfaces
{
    public interface IOrderRepository
    {

        Order AddNew(Order order);
        List<Order> GetAllFromUser();
        List<Order> GetAll();
        Order Decline(Order order);
        Order Find(long id);
        Order EditOrderAddCommentRated(Order order);
        Task<Order> FindAsync(long id);
        Task AddNewAsync(Order order);

    }
}
