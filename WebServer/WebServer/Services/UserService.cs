using WebServer.Dto;
using WebServer.Models;
using WebServer.Repository;
using WebServer.Repository.Interfaces;
using WebServer.Services.Interfaces;

namespace WebServer.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public UserDto AddUser(UserDto newUser)
        {
            throw new NotImplementedException();
        }

        public UserDto Edit(UserDto dto)
        {
            throw new NotImplementedException();
        }

        public byte[] GetImage(int id)
        {
            throw new NotImplementedException();
        }

        public List<UserDto> GetRequests()
        {
            throw new NotImplementedException();
        }

        public UserDto GetUser(long id)
        {
            User user = _userRepo.FindById(id);

            if (user == null)
            {
                return null;
            } else 
                return new UserDto 
                        { 
                            Address = user.Address,
                            Username = user.Username,
                            Email = user.Email,
                            Password = user.Password,
                            DateOfBirth = user.DateOfBirth,
                            FullName = user.FullName,
                            UserImage = user.UserImage,
                            TypeOfUser = user.UserType.ToString()
                        };
        }

        public LoginResponseDto LogIn(UserLoginDto dto)
        {
            throw new NotImplementedException();
        }

        public void Remove(UserDto user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UploadImage(IFormFile image, int id)
        {
            throw new NotImplementedException();
        }

        public UserLoginDto Verificate(UserDto userLoginDto)
        {
            throw new NotImplementedException();
        }
    }
}
