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

        public User Edit(User userPrev, User userNew)
        {
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).UserImage = userNew.UserImage;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).UserType = userNew.UserType;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).FullName = userNew.FullName;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Username = userNew.Username;

            if (!BCrypt.Net.BCrypt.Verify(userNew.Password, userPrev.Password))
            {
                if(userNew.Password != userPrev.Password)
                    _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Password = BCrypt.Net.BCrypt.HashPassword(userNew.Password);
            }

            //if (_webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Password != userNew.Password)
                //_webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Password = BCrypt.Net.BCrypt.HashPassword(userNew.Password);
            //else
                //_webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Password = BCrypt.Net.BCrypt.HashPassword(userPrev.Password);

            //_webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Password = userNew.Password;
            //_webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Id = userNew.Id;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Email = userNew.Email;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).DateOfBirth = userNew.DateOfBirth;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Address = userNew.Address;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).Verified = userNew.Verified;
            _webShopDbContext.Users.FirstOrDefault(u => u.Email == userPrev.Email).VerificationStatus = userNew.VerificationStatus;


            _webShopDbContext.SaveChanges();
            return userNew;
        }

        public User Find(User user)
        {
            return _webShopDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Email, user.Email));
        }

        public User FindByEmail(string email)
        {
            return _webShopDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Email, email));
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
