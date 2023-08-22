using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Dto;
using WebServer.Services.Interfaces;

namespace WebServer.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        private readonly IOrderService _orderService;
        //private readonly IAuthService _authService;

        IWebHostEnvironment webHostEnvironment;

        public OrdersController(IOrderService orderService, IWebHostEnvironment webHostEnvironment)
        {
            _orderService = orderService;
            //_authService = authService;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("newOrder")]
        public IActionResult AddNewOrder([FromBody]OrderDto order)
        {
            return Ok(_orderService.AddNew(order));
        }

        [HttpGet("allOrders")]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderService.GetAll());
        }

    }
}
