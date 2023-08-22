using WebServer.Dto;
using WebServer.Models;

namespace WebServer.Services.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddNew(OrderDto orderDto);
        List<OrderDto> GetAllForUSer(long id);
        List<OrderDto> GetAll();
        List<OrderDto> GetForSpecialUser(int id);
        List<OrderDto> GetForSpecialUserNew(int id);
        bool Decline(long id);
        OrderDto GetToShowOrder(long id);

    }
}
