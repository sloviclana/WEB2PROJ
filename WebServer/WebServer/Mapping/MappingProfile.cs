using AutoMapper;
using WebServer.Dto;
using WebServer.Models;

namespace WebServer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Article, ArticleDto>().ReverseMap();

        }
    }
}
