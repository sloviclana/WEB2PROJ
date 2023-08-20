import UserDto from "./UserDto";

export default class RegisterResponseDto {
    constructor(data) {
        this.userDto = new UserDto(data);
    }
}