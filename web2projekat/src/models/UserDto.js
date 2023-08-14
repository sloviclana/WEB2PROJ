export default class UserDto {
    constructor(data) {
        this.Id = data.Id,
        this.Username = data.Username,
        this.Password = data.Password,
        this.Email = data.Email,
        this.FullName = data.FullName,
        this.DateOfBirth = data.DateOfBirth,
        this.Address = data.Address,
        this.UserImage = data.UserImage,
        this.UserType = data.UserType,
        this.Verified = data.Verified
    }
}