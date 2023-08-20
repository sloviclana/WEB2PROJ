using WebServer.Infrastructure;
using WebServer.Models;
using WebServer.Repository.Interfaces;

namespace WebServer.Repository
{
    public class UserRepository : IUserRepository
    {
        private WebShopDbContext _webShopDbContext;

        public UserRepository(WebShopDbContext webShopDbContext)
        {
            _webShopDbContext = webShopDbContext;
        }

        public User Add(User user)
        {
            _webShopDbContext.Add(user);
            _webShopDbContext.SaveChanges();

            return user;
        }

        public User Edit(User user)
        {
            _webShopDbContext.Users.Update(user);
            _webShopDbContext.SaveChanges();
            return user;
        }

        public User Find(User user)
        {
            return _webShopDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Email, user.Email));
        }

        public User FindById(long id)
        {
            return _webShopDbContext.Users.SingleOrDefault<User>(u => u.Id == id);
        }

        public User FindEmail(User user)
        {
            return _webShopDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Email, user.Email));
        }

        public List<User> GetAll()
        {
            return _webShopDbContext.Users.ToList();
        }

        public void Remove(User user)
        {
            _webShopDbContext.Users.Remove(user);
            _webShopDbContext.SaveChanges();
        }

        public User Verify(User user)
        {
            _webShopDbContext.Users.Update(user);
            _webShopDbContext.SaveChanges();
            return user;   
        }
    }
}
