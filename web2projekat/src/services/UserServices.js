import UserDto from '../models/UserDto';
import ResponseDto from '../models/ResponseDto';
import axios from 'axios';
import RegisterResponseDto from '../models/RegisterResponseDto';
import SalesmanArray from '../models/SalesmanArray';


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

export const AcceptRequest = async (email) => {
    const ACCEPTANCE_URL = "api/users/accept";

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${ACCEPTANCE_URL}`,
        email, 
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const response = new RegisterResponseDto(data);
        return response;
    } catch(err) {
        alert ("Could not accept verification request!")
        return null;
    }
}

export const DenyRequest = async (email) => {
    const DENY_URL = "api/users/deny";

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${DENY_URL}`,
        email,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        
        const response = new RegisterResponseDto(data);
        return response;

    } catch(err) {
        alert ("Could not deny verification request!")
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

export const UpdateUserProfile = async(UserDto) => {
    const UPDATEPROFILE_URL = "api/users/update";

    try{
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${UPDATEPROFILE_URL}`,
            UserDto,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        const response = new RegisterResponseDto(data);
        return response;

    }catch(err){
        alert("Something went wrong with profile update!");
        return null;
    }
}

export const GetAllSalesmans = async () => {
    const GETALL_SALESMANS_URL = "api/users/allSalesmans";

    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}${GETALL_SALESMANS_URL}`);

        const response = new SalesmanArray(data);
        return response;

    } catch(err) {
        
        alert("Cannot get information about salesman users!");
        return null;
    }
}
