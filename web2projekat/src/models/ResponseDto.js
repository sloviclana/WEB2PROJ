import UserDto from "./UserDto";

export default class ResponseDto{
    constructor(data){
        this.token = data.token;
        this.userDto = new UserDto(data.userDto);     //ovde dodaj data.UserDto kad prosledis token sa odgovorom
        this.result = data.result;
    }
}

