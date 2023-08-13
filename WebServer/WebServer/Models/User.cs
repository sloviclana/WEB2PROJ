using System.Diagnostics.Eventing.Reader;
using WebServer.Enums;

namespace WebServer.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserImage { get; set; }
        public UserType UserType { get; set; }
        public bool Verified { get; set; }

        public List<Order> Orders { get; set; }


    }
}
