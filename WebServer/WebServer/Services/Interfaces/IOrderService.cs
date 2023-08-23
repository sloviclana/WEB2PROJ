using WebServer.Dto;
using WebServer.Models;

namespace WebServer.Services.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddNew(OrderDto orderDto);
        List<OrderShowDto> GetAllForUSer(long id);
        List<OrderShowDto> GetAll();
        List<OrderDto> GetForSpecialUser(int id);
        List<OrderDto> GetForSpecialUserNew(int id);
        bool Decline(long id);
        OrderDto GetToShowOrder(long id);

    }
}
