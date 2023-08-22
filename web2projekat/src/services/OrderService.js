import UserDto from '../models/UserDto';
import ResponseDto from '../models/ResponseDto';
import OrderArticleDto from '../models/OrderArticleDto';
import OrderDto from '../models/OrderDto';
import axios from 'axios';
import OrderResponseDto from '../models/RegisterResponseDto';
//import SalesmanArray from '../models/SalesmanArray';


export const AddNewOrder = async (OrderDto) => {
    const ORDER_URL = "api/orders/newOrder";

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${ORDER_URL}`,
        OrderDto,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        );

        const response = new OrderResponseDto(data);
        return response;

    } catch(err) {
        alert("Something went wrong with ordering!");
        return null;
    }
}