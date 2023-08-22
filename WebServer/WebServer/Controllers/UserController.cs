using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using WebServer.Dto;
using WebServer.Models;
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
            if (userDto != null)
            {
                return Ok(_userService.LogIn(userDto));
            } else
            {
                return BadRequest();
            }
        }

        [HttpGet("allSalesmans")]
        public IActionResult GetAllSalesmans()
        {
            return Ok(_userService.GetAllSalesman());
        }

        [HttpPost("accept")]
        public IActionResult AcceptVerificationRequest([FromBody]string email)
        {
            UserDto userDto = _userService.GetUserByEmail(email);

            //UserDto newUser = userDto;
            userDto.VerificationStatus = "ACCEPTED";

            return Ok(_userService.Edit(userDto));
        }

        [HttpPost("deny")]
        public IActionResult DenyVerificationRequest([FromBody]string email)
        {
            UserDto userDto = _userService.GetUserByEmail(email);

            UserDto newUser = userDto;
            userDto.VerificationStatus = "DENIED";

            return Ok(_userService.Edit(userDto));
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

        [HttpPost("update")]
        public IActionResult UpdateProfile([FromBody] UserDto UserDto)
        {
            if(UserDto != null)
            {
                return Ok(_userService.Edit(UserDto));

            } else
            {
                return BadRequest();
            }
        }

    }
}
