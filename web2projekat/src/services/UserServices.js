import UserDto from '../models/UserDto';
import ResponseDto from '../models/ResponseDto';
import axios from 'axios';
import RegisterResponseDto from '../models/RegisterResponseDto';


export const LogInUser = async(email, password) => {
    const LOGIN_URL = "api/users/login";

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${LOGIN_URL}`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        );

        const response = new ResponseDto(data);
        return response;

    } catch(err) {
        alert("Something went wrong with logging in!");
        return null;
    }
}

export const RegisterUser = async (UserDto) => {
    const REGISTRATION_URL = "api/users/register";

    try{
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${REGISTRATION_URL}`,
            UserDto,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        const response = new RegisterResponseDto(data);
        return response;
    }catch(err){
        alert("Something went wrong with the registration!");
        return null;
    }
}