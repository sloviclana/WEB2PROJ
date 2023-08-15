using System.ComponentModel.DataAnnotations;

namespace WebServer.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UserDto User { get; set; }

        [Required]
        public bool LogedIn { get; set; }
    }
}
