using System.ComponentModel.DataAnnotations;

namespace WebServer.Dto
{
    public class UserDto
    {
        public long Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        public string UserImage { get; set; }

        [Required]
        public string UserType { get; set; }

        public string VerificationStatus { get; set; }

        public bool Verified { get; set; }

        //public double DeliveryPrice { get; set; }
    }
}
