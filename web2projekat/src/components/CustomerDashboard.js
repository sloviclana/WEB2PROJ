import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { GetAllArticles } from '../services/ArticleServices';
import OrderDto from '../models/OrderDto';
import OrderArticleDto from '../models/OrderArticleDto';
import { AddNewOrder, CancelOrder, GetAllOrdersForUser } from '../services/OrderService';
import { format } from 'date-fns';
import OrderResponseDto from '../models/OrderResponseDto';


const CustomerDashboard = () => {
    const navigate = useNavigate();
    const[articles, setArticles] = useState([]);
    const[orders, setOrders] = useState([]);
    const[selectedValues, setSelectedValues] = useState([]);
    const[comment, setComment] = useState('');
    const[deliveryAddress, setDeliveryAddress] = useState('');
    const[price, setPrice] = useState(0);
    const[priceWithDelivery, setPriceWithDelivery] = useState(0);
    //setPrice(0);

    const[articlesForOrder, setArticlesForOrder] = useState([]);
    const[order, setOrder] = useState(new OrderDto(null));
    const[canCancel, setCanCancel] = useState(0);
   

    const profileRedirect = () => {
        navigate('/profile');
    }

    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await GetAllArticles();

            const user = sessionStorage.getItem('user');
            const userDto = JSON.parse(user);
            const userId = `${userDto.Id}`;
            const response2 = await GetAllOrdersForUser(userId);

            //cancellation(order.orderTime);

            if (response) {
                setArticles(response.articlesArray); // Set the fetched data to the state
            }

            if(response2) {
                setOrders(response2.ordersArray);
            }

          } catch (error) {
            // Handle error
          }
        }
    
        fetchData();
      }, []);

      /*const user = sessionStorage.getItem('user');
            const userDto = JSON.parse(user);
            const email = userDto.Email;
            const response2 = await GetAllOrdersForUser(email);*/

    function reloadPage() {
        window.location.reload();
    }
      
      // Call the function wherever needed
      

    const logout = () => {
        sessionStorage['user'] = null;
        navigate('/');
    }

    const handleOrdering = (id, quantity, priceOfArticle) => {
        setPrice(price + (priceOfArticle*quantity));
        //setPriceWithDelivery(price + 300);
        setArticlesForOrder([...articlesForOrder, new OrderArticleDto(id, quantity)]);
    }

    const finishOrder = () => {
        const user = sessionStorage.getItem('user');
        const userDto = JSON.parse(user);
        const userId = userDto.Id;
        const order = new OrderDto(articlesForOrder, userId, comment, deliveryAddress, price);
        
        async function fetchData() {
            try {
              const data = await AddNewOrder(order);
              if(data !== null){
                
                alert("Successfull ordering!");
                reloadPage();
            }
            else{
                
                alert("Something went wrong!");
                //setInputsToEmpty();
            }
            } catch (error) {
              // Handle error
            }
          }
      
        fetchData();
        
        
    }

    const cancellation = (orderTime) => {
        const isoDateWithoutFractionalSeconds = orderTime.split('.')[0];

        const parsedDate = new Date(isoDateWithoutFractionalSeconds);
        parsedDate.setHours(parsedDate.getHours() + 1);
        const currentDatetime = new Date();

        if(parsedDate > currentDatetime)
            return 1;
        else 
            return 0;
    }

    const handleSelectChange = (articleId, e) => {
        setSelectedValues({
            ...selectedValues,
            [articleId]: parseInt(e.target.value, 10),
          });

        // You can store this selectedQuantity in your component's state or use it directly when needed
      };

      const formatArticles = (articles) => {
        return articles.map((article) => `${article.id} (${article.quantity})`).join(', ');
      };

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };

      const cancelOrder = (orderId) => {
        async function fetchData() {
            try {
              const response = await CancelOrder(orderId);
  
              if (response) {
                  setArticles(response.articlesArray); // Set the fetched data to the state
                  reloadPage();
              }
  
  
            } catch (error) {
              // Handle error
            }
          }
      
          fetchData();
        }
      

    return (
        <div className='card'>
            <h1>Welcome, customer!</h1>
            Here you can check/change your profile data <br></br>
            <button onClick={profileRedirect}>Profile</button>
            <br></br> <br></br>
            You can also log out: <br></br>
            <button onClick={logout}>Log out</button>
            <br></br> <br></br>
            <table className="salesman-table">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.name}</td>
                        <td>{article.price}</td>
                        <td>{article.quanity}</td>
                        <td>
                        {article.description}
                        </td>
                        <td>{article.image}</td>
                        <td>
                        Quantity:
                        <select value={selectedValues[article.id] || ''} onChange={(e) => handleSelectChange(article.id, e)}>
                            {Array.from({ length: article.quanity }, (_, index) => index + 1).map((value) => (
                                <option key={value} value={value}>
                                {value}
                                </option>
                            ))}
                        </select>
                            <button disabled = {(article.quanity === 0)} onClick={() => handleOrdering(article.id, selectedValues[article.id], article.price)}>Add to order</button>
                        </td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>

            Articles you added to your order: 
            <table className="salesman-table">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {articlesForOrder.map(article => (
                    <tr>
                        <td>{article.Id}</td>
                        <td>{article.Quantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            


            <br></br>
            Price of picked articles: {price}

            <br></br>

            When you pick articles for your order, please leave here your delivery address, and a comment if you have one:
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Leave a comment here'></input>
            <br></br>
            <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder='Delivery address'></input>
            <br></br>
            Delivery price: 300.00
            <br></br>
            <br></br>
            Total price of your order: {price + 300} <br></br>
            <button onClick={finishOrder}>Finish your order</button>
            <br></br>
            <br></br>
            Here are your previous orders. You can cancel your order 1h after creating it, later it will be in delivery proccess. <br></br>
            <table className="salesman-table">
                <thead>
                    <tr>
                    <th>Price</th>
                    <th>Articles</th>
                    <th>Comment</th>
                    <th>Delivery address</th>
                    <th>Order time</th>
                    <th>Delivery time</th>
                    <th>Status of order</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.price}</td>
                        <td>{formatArticles(order.articles)}</td>
                        <td>{order.comment}</td>
                        <td>{order.deliveryAddress}</td>
                        <td>{order.orderTime.split('.')[0]}</td>
                        <td>{order.deliveryTime.split('.')[0]}</td>
                        <td>{order.isDelevered ? 'Delivered' : 'Not delivered'}</td>
                        <td><button disabled = {cancellation(order.orderTime) === 0} onClick={() => cancelOrder(order.id)}>Cancel order</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <br></br>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        
    )
}

export default CustomerDashboard;