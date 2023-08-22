export default class UserDto {
    constructor(data) {
        this.Id = data.id;
        this.Username = data.username;
        this.Password = data.password;
        this.Email = data.email;
        this.FullName = data.fullName;
        this.DateOfBirth = data.dateOfBirth;
        this.Address = data.address;
        this.UserImage = data.userImage;
        this.UserType = data.userType;
        this.Verified = data.verified;
        this.VerificationStatus = data.verificationStatus
    }
}