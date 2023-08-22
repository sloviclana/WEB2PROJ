using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebServer.Dto;
using WebServer.Models;
using WebServer.Repository.Interfaces;
using WebServer.Services.Interfaces;

namespace WebServer.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        
        //private readonly Mutex mutex = new Mutex();


        public OrderService(IOrderRepository orderRepository, IMapper mapper, IUserRepository userRepository, IArticleRepository articleRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _articleRepository = articleRepository;
        }

        public OrderDto AddNew(OrderDto orderDto)
        {
            if (orderDto.Articles == null)
                return null;

            List<Article> articles = new List<Article>();
            foreach(OrderArticleDto article in orderDto.Articles)
            {
                Article a = _articleRepository.GetArticle(article.Id);
                articles.Add(a);

            }

            Order newOrder = new Order()
            {
                Articles = articles,
                Comment = orderDto.Comment,
                FinalPrice = orderDto.Price,
                OrderTime = DateTime.Now,
                IsDelevered = false,
                DeliveryAddress = orderDto.DeliveryAddress,
                UserId = orderDto.UserId,
                Customer = _userRepository.FindById(orderDto.UserId)
            };

            Random hoursGenerator = new Random();
            int additionalHours = hoursGenerator.Next(2, 12);
            newOrder.DeliveryTime = DateTime.Now.AddHours(additionalHours);
            newOrder.FinalPrice = newOrder.FinalPrice + 300;

            _orderRepository.AddNew(newOrder);

            try
            {
                foreach(OrderArticleDto orderArticleDto in orderDto.Articles)
                {
                    Article article = _articleRepository.GetArticle(orderArticleDto.Id);

                    if(article == null)
                    {
                        _orderRepository.DeleteAsync(newOrder);
                        return null;
                    }

                    article.Quanity -= orderArticleDto.Quantity;

                    _articleRepository.Edit(article);

                }

                //Order order = _orderRepository.FindAsync(newOrder.Id).Result;
                //OrderDto newOrderDto = _mapper.Map<OrderDto>(order);

                return orderDto;

            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                //obrisati porudzbinu
                //PorudzbinaHelperClass.ReturnKolicinaArtikalaPorudzbine(newPorudzbinaDto.ArtikliPorudzbine, _dbContext);
                _orderRepository.DeleteAsync(newOrder);
                //await _dbContext.SaveChangesAsync();
                return null;
            }

        }

        public bool Decline(long id)
        {
            throw new NotImplementedException();
        }

        public List<OrderDto> GetAll()
        {
            var orders = _orderRepository.GetAll();

            List<OrderDto> orderDtos = new List<OrderDto>();
            List<OrderArticleDto> articlesForOrder = new List<OrderArticleDto>();


            foreach(Order o in orders)
            {
                foreach(Article article in o.Articles)
                {
                    OrderArticleDto articleDto = new OrderArticleDto()
                    {
                        Id = article.Id,
                        Quantity = article.Quanity
                    };

                    articlesForOrder.Add(articleDto);
                }

                OrderDto orderDto = new OrderDto()
                {
                    Articles = articlesForOrder,
                    UserId = o.UserId,
                    Comment = o.Comment,
                    DeliveryAddress = o.DeliveryAddress,
                    Price = o.FinalPrice
                    //Id = o.Id,
                };

                orderDtos.Add(orderDto);
                articlesForOrder.Clear();
            }

            return orderDtos;
        }

        public List<OrderDto> GetAllForUSer(long id)
        {
            var orders = _orderRepository.GetAllFromUser(id);

            List<OrderDto> orderDtos = new List<OrderDto>();
            List<OrderArticleDto> articlesForOrder = new List<OrderArticleDto>();


            foreach (Order o in orders)
            {
                foreach (Article article in o.Articles)
                {
                    OrderArticleDto articleDto = new OrderArticleDto()
                    {
                        Id = article.Id,
                        Quantity = article.Quanity
                    };

                    articlesForOrder.Add(articleDto);
                }

                OrderDto orderDto = new OrderDto()
                {
                    Articles = articlesForOrder,
                    UserId = o.UserId,
                    Comment = o.Comment,
                    DeliveryAddress = o.DeliveryAddress,
                    Price = o.FinalPrice
                    //Id = o.Id,
                };

                orderDtos.Add(orderDto);
                articlesForOrder.Clear();
            }

            return orderDtos;
        }

        public List<OrderDto> GetForSpecialUser(int id)
        {
            throw new NotImplementedException();
        }

        public List<OrderDto> GetForSpecialUserNew(int id)
        {
            throw new NotImplementedException();
        }

        public OrderDto GetToShowOrder(long id)
        {
            throw new NotImplementedException();
        }
    }
}
