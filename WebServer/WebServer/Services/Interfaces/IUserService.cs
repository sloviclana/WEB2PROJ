using WebServer.Dto;

namespace WebServer.Services.Interfaces
{
    public interface IUserService
    {

        UserDto AddUser(UserDto newUser);
        LoginResponseDto LogIn(UserLoginDto dto);
        UserDto Edit(UserDto dto);
        UserLoginDto Verificate(UserDto userLoginDto);
        UserDto GetUser(long id);
        List<UserDto> GetRequests();
        void Remove(UserDto user);

        
        //Task<LoginResponseDto> LoginExternal(ExternalRegister userInfo);
        Task<bool> UploadImage(IFormFile image, int id);
        byte[] GetImage(int id);

    }
}
