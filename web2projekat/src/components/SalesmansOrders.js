import React from "react";
import { GetAllForSalesman } from "../services/OrderService";
import { useState } from "react";
import { useEffect } from "react";

const SalesmansOrders = () => {

    const[orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            //const response = await GetAllArticles();

            const user = sessionStorage.getItem('user');
            const userDto = JSON.parse(user);
            const userId = `${userDto.Id}`;
            const response2 = await GetAllForSalesman(userId);

            //cancellation(order.orderTime);

            //if (response) {
                //setArticles(response.articlesArray); // Set the fetched data to the state
            //}

            if(response2) {
                setOrders(response2.ordersArray);
            }

          } catch (error) {
            // Handle error
          }
        }
    
        fetchData();
      }, []);

      const formatArticles = (articles) => {
        return articles.map((article) => `${article.id} (${article.quantity})`).join(', ');
      };

    return (
        <div className="card">
            Here you can see all previous and new orders that contain your articles.

            <br></br>
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
                    <th>Previous / new</th>
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
                        <td>{order.isDelevered ? 'PREVIOUS' : 'NEW'}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesmansOrders;