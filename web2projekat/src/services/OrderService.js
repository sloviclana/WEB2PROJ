import UserDto from '../models/UserDto';
import ResponseDto from '../models/ResponseDto';
import OrderArticleDto from '../models/OrderArticleDto';
import OrderDto from '../models/OrderDto';
import axios from 'axios';
import OrderResponseDto from '../models/RegisterResponseDto';
import OrderListResponseDto from '../models/OrderListResponseDto';
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

export const GetAllOrders = async () => {
    const ALLORDERS_URL = "api/orders/allOrders";

    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}${ALLORDERS_URL}`,
       
        );

        const response = new OrderListResponseDto(data);
        return response;

    } catch(err) {
        alert("Something went wrong with getting all orders!");
        return null;
    }

}

export const GetAllOrdersForUser = async (userId) => {
    const GETFORUSER_URL = "api/orders/allForUser";

    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}${GETFORUSER_URL}`,
        {
            params: { userId }, // Pass the email as a query parameter
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const response = new OrderListResponseDto(data);
        return response;

    } catch(err) {
        alert("Something went wrong with getting previous orders!");
        return null;
    }
}

export const CancelOrder = async (orderId) => {
    const CANCEL_URL = "api/orders/cancelOrder";

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${CANCEL_URL}`,
        orderId,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        );

        const response = new OrderListResponseDto(data);
        return response;

    } catch(err) {
        alert("Something went wrong with canceling the order!");
        return null;
    }
}