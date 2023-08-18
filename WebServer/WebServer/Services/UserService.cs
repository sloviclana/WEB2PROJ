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

        //private readonly IUserRepository _userRepository;
        //private readonly IConfigurationSection _secretKey;
        //private readonly IConfigurationSection _facebookSettings;
        //private readonly IMailService _mailservice;
        //private readonly IAuthService _authService;
        IWebHostEnvironment webHostEnvironment;

        /*
        public UserService(IUserRepository userRepository, IConfiguration config, IMailService mailservice, IAuthService authService, IWebHostEnvironment webHostEnvironment)
        {
            _userRepository = userRepository;
            _secretKey = config.GetSection("SecretKey");
            _facebookSettings = config.GetSection("FacebookAuthSettings");
            _mailservice = mailservice;
            _authService = authService;
            this.webHostEnvironment = webHostEnvironment;
        }
        */

        public UserService(IUserRepository userRepo, IWebHostEnvironment webHostEnvironment)
        {
            _userRepo = userRepo;
            this.webHostEnvironment = webHostEnvironment;
        }

        public UserDto AddUser(UserDto newUser)
        {
             if(_userRepo.Find(new User { Username = newUser.Username })!=null)
            {
                return null;
            }
            if (_userRepo.FindEmail(new User { Email = newUser.Email }) != null)
            {
                return null;
            }

            User user = new User {Username=newUser.Username, Address = newUser.Address, DateOfBirth = newUser.DateOfBirth, Email = newUser.Email, FullName = newUser.FullName, UserImage = newUser.UserImage, /*Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password)*/ Password = newUser.Password };
            
            if (newUser.UserType == "ADMIN")
            {
                user.UserType = Enums.UserType.ADMIN;
                user.Verified = true;
            }
            if (newUser.UserType == "CUSTOMER")
            {
                user.UserType = Enums.UserType.CUSTOMER;
                user.Verified = true;
            }
            if (newUser.UserType == "SALESMAN")
            {
                user.UserType = Enums.UserType.SALESMAN;
                user.Verified = false;
            }

            User u=_userRepo.Add(user);

            return new UserDto {Id = u.Id, Username=u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FullName = u.FullName, UserImage = u.UserImage, Password = u.Password, UserType = u.UserType.ToString() };
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
                            UserType = user.UserType.ToString()
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
