using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using WebServer.Dto;
using WebServer.Services.Interfaces;

namespace WebServer.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        //private readonly IAuthService _authService;

        IWebHostEnvironment webHostEnvironment;

        public UserController(IUserService userService, IWebHostEnvironment webHostEnvironment)
        {
            _userService = userService;
            //_authService = authService;
            this.webHostEnvironment = webHostEnvironment;
        }

        //[HttpPost("login")]
        [HttpPost("login")]
        public IActionResult LogIn([FromBody] UserLoginDto userDto)
        {
            return Ok(_userService.LogIn(userDto));
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto UserDto)
        {
            if (UserDto != null)
            {
                return Ok(_userService.AddUser(UserDto));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
