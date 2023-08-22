using WebServer.Models;

namespace WebServer.Repository.Interfaces
{
    public interface IUserRepository
    {

        User Add(User user);
        User Find(User user);
        User FindEmail(User user);
        User Edit(User userPrev, User userNew);
        User Verify(User user);
        User FindById(long id);
        User FindByEmail(string email);
        List<User> GetAll();
        void Remove(User user);

    }
}
