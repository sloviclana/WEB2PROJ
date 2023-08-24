﻿using Microsoft.EntityFrameworkCore;
using WebServer.Infrastructure;
using WebServer.Models;
using WebServer.Repository.Interfaces;

namespace WebServer.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private WebShopDbContext _webShopDbContext;

        public OrderRepository(WebShopDbContext webShopDbContext)
        {
            _webShopDbContext = webShopDbContext;
        }

        public Order AddNew(Order order)
        {
            //order.Id++;
            _webShopDbContext.Orders.Add(order);
            _webShopDbContext.SaveChanges();
            return order;
        }

        public async Task AddNewAsync(Order order)
        {
            _webShopDbContext.Orders.Add(order);
            //_webShopDbContext.Orders.FirstOrDefault()
            _webShopDbContext.SaveChanges();
        }

        public Order Decline(Order order)
        {
            order.IsDelevered = false;
            _webShopDbContext.Orders.Update(order);
            _webShopDbContext.SaveChanges();
            return order;
        }

        public void DeleteAsync(Order o)
        {
            //Order o = _webShopDbContext.Find(o => o.Id == id);
            _webShopDbContext.Orders.Remove(o);
            _webShopDbContext.SaveChangesAsync();
            //return null;
        }

        public Order EditOrderAddCommentRated(Order order)
        {
            _webShopDbContext.Orders.Update(order);
            _webShopDbContext.SaveChanges();
            return order;
        }

        public Order Find(long id)
        {
            return _webShopDbContext.Orders.Include(o => o.Articles).FirstOrDefault(o => o.Id == id);
        }

        public async Task<Order> FindAsync(long id)
        {
            return await _webShopDbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
        }

        public List<Order> GetAll()
        {
            return _webShopDbContext.Orders.Include(o => o.Articles).ToList();
        }

        public List<Order> GetAllForSalesman(long id)
        {
            var orders = _webShopDbContext.Orders.Include(o =>o.Articles).ToList();

            List<Order> result = new List<Order>();

            foreach(Order o in orders)
            {
                if (o.Articles.Find(a => a.UserId == id) != null)
                    result.Add(o);

            }

            return result;
        }

        public List<Order> GetAllFromUser(long id)
        {
            var orders = new List<Order>();
            foreach(Order o in _webShopDbContext.Orders.Include(o => o.Articles).ToList())
            {
                if(o.UserId == id)
                    orders.Add(o);
            }

            return orders;
        }
    }
}
