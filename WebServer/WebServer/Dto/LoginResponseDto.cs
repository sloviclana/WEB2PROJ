using System.ComponentModel.DataAnnotations;

namespace WebServer.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UserDto UserDto { get; set; }

        [Required]
        public bool LogedIn { get; set; }
    }
}
