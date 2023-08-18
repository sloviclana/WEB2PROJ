import UserDto from '../models/UserDto';
import ResponseDto from '../models/ResponseDto';
import axios from 'axios';


export const LogInUser = async(email, password) => {
    const LOGIN_URL = "/users/login";
}

export const RegisterUser = async (UserDto) => {
    const REGISTRATION_URL = "api/users/register";

    try{
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${REGISTRATION_URL}`,
            UserDto
        );
        const response = new ResponseDto(data);
        return response;
    }catch(err){
        alert("Nesto se desilo prilikom registracije");
        return null;
    }
}