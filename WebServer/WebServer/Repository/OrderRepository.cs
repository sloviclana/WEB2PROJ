using WebServer.Models;
using WebServer.Repository.Interfaces;

namespace WebServer.Repository
{
    public class OrderRepository : IOrderRepository
    {
        public Order AddNew(Order order)
        {
            throw new NotImplementedException();
        }

        public Task AddNewAsync(Order order)
        {
            throw new NotImplementedException();
        }

        public Order Decline(Order order)
        {
            throw new NotImplementedException();
        }

        public Order EditOrderAddCommentRated(Order order)
        {
            throw new NotImplementedException();
        }

        public Order Find(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Order> FindAsync(long id)
        {
            throw new NotImplementedException();
        }

        public List<Order> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Order> GetAllFromUser()
        {
            throw new NotImplementedException();
        }
    }
}
