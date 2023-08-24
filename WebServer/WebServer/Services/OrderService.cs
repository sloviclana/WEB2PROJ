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
        
        private readonly Mutex mutex = new Mutex();


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
                /*
                Article a = new Article() 
                { 
                    Id = article.Id, 
                    Quanity = article.Quantity, 
                    Name = "", 
                    Description = "", 
                    Price = 0,
                    Image = "",
                    UserId = 0
                };*/
                //int quantity = article.Quantity;
                //a.Quanity = article.Quantity;

                /*
                articles.Add(new Article()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Image = a.Image,
                    UserId = a.UserId,
                    Price = a.Price,
                    Quanity = article.Quantity
                });
                */
                //a.Quanity = quantity;
                articles.Add(a);
                //a.Quanity = a.Quanity - article.Quantity;

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

            //return orderDto;



            try
            {
                foreach(OrderArticleDto orderArticleDto in orderDto.Articles)
                {
                    mutex.WaitOne();
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

            } finally
            {
                //Console.WriteLine(ex.Message);
                //obrisati porudzbinu
                //PorudzbinaHelperClass.ReturnKolicinaArtikalaPorudzbine(newPorudzbinaDto.ArtikliPorudzbine, _dbContext);
                //_orderRepository.DeleteAsync(newOrder);
                //await _dbContext.SaveChangesAsync();
                mutex.ReleaseMutex();
                //return null;
            }
            
        }

        public bool Decline(long id)
        {
            Order o = _orderRepository.Find(id);
            var orderArticles = o.Articles;

            bool success = false;

            if(o == null)
            {
                success = false;

            } else
            {
                foreach (var article in orderArticles)
                {
                    Article a = _articleRepository.GetArticle(article.Id);
                    a.Quanity = a.Quanity + article.Quanity;
                    _articleRepository.Edit(a);
                }

                _orderRepository.DeleteAsync(o);
                success = true;
            }

            return success;
        }

        public List<OrderShowDto> GetAll()
        {
            var orders = _orderRepository.GetAll();

            List<OrderShowDto> orderDtos = new List<OrderShowDto>();
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

                bool delivered = (o.DeliveryTime < DateTime.Now);

                OrderShowDto orderDto = new OrderShowDto()
                {
                    Id = o.Id,
                    Articles = articlesForOrder,
                    UserId = o.UserId,
                    Comment = o.Comment,
                    DeliveryAddress = o.DeliveryAddress,
                    Price = o.FinalPrice,
                    OrderTime = o.OrderTime,
                    DeliveryTime = o.DeliveryTime,
                    IsDelevered = delivered
                    //Id = o.Id,
                };

                orderDtos.Add(orderDto);
                //articlesForOrder.Clear();
            }

            return orderDtos;
        }

        public List<OrderShowDto> GetAllForUSer(long id)
        {
            var orders = _orderRepository.GetAllFromUser(id);

            List<OrderShowDto> orderDtos = new List<OrderShowDto>();
            List<OrderArticleDto> articlesForOrder = new List<OrderArticleDto>();
            List<OrderArticleDto> temp = new List<OrderArticleDto>();


            foreach (Order o in orders)
            {
                foreach (Article article in o.Articles)
                {
                    OrderArticleDto articleDto = new OrderArticleDto()
                    {
                        Id = article.Id,
                        Quantity = article.Quanity
                    };

                    temp.Add(articleDto);
                }

                articlesForOrder = temp;
                bool delivered = (o.DeliveryTime < DateTime.Now);

                OrderShowDto orderDto = new OrderShowDto()
                {
                    Id = o.Id,
                    Articles = articlesForOrder,
                    UserId = o.UserId,
                    Comment = o.Comment,
                    DeliveryAddress = o.DeliveryAddress,
                    Price = o.FinalPrice,
                    OrderTime = o.OrderTime,
                    DeliveryTime = o.DeliveryTime,
                    IsDelevered = delivered
                    //Id = o.Id,
                };

                orderDtos.Add(orderDto);

                temp.Clear();
            }

            return orderDtos;
        }

        public List<OrderShowDto> GetForSalesman(long id)
        {
            var orders = _orderRepository.GetAllForSalesman(id);

            List<OrderShowDto> result = new List<OrderShowDto>();

            foreach(Order o in orders)
            {
                List<OrderArticleDto> articlesForOrder = new List<OrderArticleDto>();

                foreach(Article a in o.Articles)
                {
                    OrderArticleDto orderArticleDto = new OrderArticleDto()
                    {
                        Id = a.Id,
                        Quantity = a.Quanity
                    };

                    articlesForOrder.Add(orderArticleDto);
                }

                OrderShowDto order = new OrderShowDto()
                {
                    Articles = articlesForOrder,
                    UserId = o.UserId,
                    Comment = o.Comment,
                    DeliveryAddress = o.DeliveryAddress,
                    DeliveryTime = o.DeliveryTime,
                    OrderTime = o.OrderTime,
                    IsDelevered = o.IsDelevered,
                    Price = o.FinalPrice
                };

                result.Add(order);
            }

            return result;
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
