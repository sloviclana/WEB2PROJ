using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

        private readonly IUserRepository _userRepository;
        private readonly IConfigurationSection _secretKey;
        private readonly IConfigurationSection _facebookSettings;
        private readonly IMapper _mapper;
        //private readonly IMailService _mailservice;
        //private readonly IAuthService _authService;
        IWebHostEnvironment webHostEnvironment;

        
        public UserService(IUserRepository userRepository, IConfiguration config, /* IMailService mailservice, IAuthService authService,*/ IWebHostEnvironment webHostEnvironment, IMapper mapper)
        {
            _userRepo = userRepository;
            _secretKey = config.GetSection("SecretKey");
            _facebookSettings = config.GetSection("FacebookAuthSettings");
            //_mailservice = mailservice;
            //_authService = authService;
            this.webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
        }
        

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

            User user = new User {Username=newUser.Username, Address = newUser.Address, DateOfBirth = newUser.DateOfBirth, Email = newUser.Email, FullName = newUser.FullName, UserImage = newUser.UserImage, Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password) };
            
            if (newUser.UserType == "ADMIN")
            {
                user.UserType = Enums.UserType.ADMIN;
                user.Verified = true;
                user.VerificationStatus = Enums.VerificationStatus.ACCEPTED;
            }
            if (newUser.UserType == "CUSTOMER")
            {
                user.UserType = Enums.UserType.CUSTOMER;
                user.Verified = true;
                user.VerificationStatus = Enums.VerificationStatus.ACCEPTED;
            }
            if (newUser.UserType == "SALESMAN")
            {
                user.UserType = Enums.UserType.SALESMAN;
                user.Verified = false;
                user.VerificationStatus = Enums.VerificationStatus.PROCCESSING;
            }

            User u=_userRepo.Add(user);

            return new UserDto {Id = u.Id, Username=u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, FullName = u.FullName, UserImage = u.UserImage, Password = u.Password, UserType = u.UserType.ToString(), Verified = u.Verified };
        }

        public UserDto Edit(UserDto dto)
        {
            User u = new User()
            {
                Id = dto.Id,
                Username = dto.Username,
                Address = dto.Address,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                FullName = dto.FullName,
                UserImage = dto.UserImage,
                Password = dto.Password,
                Verified = dto.Verified
            };

            if (dto.UserType == "ADMIN")
                u.UserType = Enums.UserType.ADMIN;
                //u.Verified = true;
            else if (dto.UserType == "SALESMAN")
                u.UserType = Enums.UserType.SALESMAN;
            else
                u.UserType = Enums.UserType.CUSTOMER;


            if (dto.VerificationStatus == "ACCEPTED")
                u.VerificationStatus = Enums.VerificationStatus.ACCEPTED;
            else if (dto.VerificationStatus == "DENIED")
                u.VerificationStatus = Enums.VerificationStatus.DENIED;
            else
                u.VerificationStatus = Enums.VerificationStatus.PROCCESSING;

            string oldPassword = u.Password;
            //string newPassword = BCrypt.Net.BCrypt.HashPassword(u.Password);
            //u.Password = newPassword;

            User previous = _userRepo.Find(u);

            if (previous == null)
            {
                return null;

            } else
            {
                _userRepo.Edit(previous, u);
            }

            u.Password = oldPassword;
            return _mapper.Map<UserDto>(u);
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

        public UserDto GetUserByEmail(string email)
        {
            User user = _userRepo.FindByEmail(email);

            if (user == null)
            {
                return null;
            }
            else
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
            User user = new User { Email = dto.Email, Password = dto.Password };

            user = _userRepo.Find(user);
            if (user == null)
                return null;
            
            if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                List<Claim> claims = new List<Claim>();

                if (user.UserType == Enums.UserType.ADMIN)
                    claims.Add(new Claim(ClaimTypes.Role, "ADMIN"));
                else if (user.UserType == Enums.UserType.SALESMAN)
                    claims.Add(new Claim(ClaimTypes.Role, "SALESMAN"));
                else if (user.UserType == Enums.UserType.CUSTOMER)
                    claims.Add(new Claim(ClaimTypes.Role, "CUSTOMER"));


                    

                claims.Add(new Claim(ClaimTypes.Role, "user"));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:7189",
                    claims: claims,
                    expires: DateTime.Now.AddYears(1),
                    signingCredentials: signinCredentials
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                LoginResponseDto loginResponseDto = new LoginResponseDto { Token = tokenString, UserDto = new UserDto { Username = user.Username, Address = user.Address, DateOfBirth = user.DateOfBirth, Email = user.Email, FullName = user.FullName, UserImage = user.UserImage, Password = dto.Password, UserType = user.UserType.ToString(), Id = user.Id, VerificationStatus = user.VerificationStatus.ToString(), Verified = user.Verified }, LogedIn = true };
                return loginResponseDto;
            }
            else
            {
                return new LoginResponseDto { LogedIn = false };
            }
                /*
                else
                {
                    return new LoginResponseDto { LogedIn = false };
                }*/
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

        public List<UserDto> GetAllSalesman()
        {
            var users = _userRepo.GetAll();

            List<UserDto> salesmans = new List<UserDto>();

            foreach(var user in users)
            {
                if (user.UserType.ToString() == "SALESMAN")
                    salesmans.Add(new UserDto()
                    {
                        Username = user.Username,
                        Email = user.Email,
                        Password = user.Password,
                        UserType = user.UserType.ToString(),
                        VerificationStatus = user.VerificationStatus.ToString(),
                        UserImage = user.UserImage,
                        Address = user.Address,
                        DateOfBirth = user.DateOfBirth,
                        FullName = user.FullName,
                        Verified = user.Verified
                    }
                    ) ;
            }

            return salesmans;

        }
    }
}
