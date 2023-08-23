import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useEffect } from 'react';
import { GetAllOrders } from '../services/OrderService';

const AdminDashboard = () => {

    const navigate = useNavigate();
    const[orders, setOrders] = useState([]);

    const profileRedirect = () => {
        navigate('/profile');
    }

    const logout = () => {
        sessionStorage['user'] = null;
        navigate('/');
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await GetAllOrders();
            if (response) {
                setOrders(response.ordersArray); // Set the fetched data to the state
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
        <div className='card'>
            <h1>Welcome, admin!</h1>
            <p>Here you can check/change your profile data   </p>
            <button onClick={profileRedirect}>Profile</button>

            <p>You can also log out: </p>
            <button onClick={logout}>Log out</button>

            <p>Here you can see all request for verification: </p>
            <Link to="/salesmans"><label>Verification requests &nbsp;</label></Link>
            <br></br>
            <br></br>
            History of all orders:
            <table className="salesman-table">
                <thead>
                    <tr>
                    <th>User id</th>
                    <th>Price</th>
                    <th>Articles</th>
                    <th>Comment</th>
                    <th>Delivery address</th>
                    <th>Order time</th>
                    <th>Delivery time</th>
                    
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.userId}</td>
                        <td>{order.price}</td>
                        <td>{formatArticles(order.articles)}</td>
                        <td>{order.comment}</td>
                        <td>{order.deliveryAddress}</td>
                        <td>{order.orderTime.split('.')[0]}</td>
                        <td>{order.deliveryTime.split('.')[0]}</td>
                        <td>{order.isDelevered ? 'Delivered' : 'Not delivered'}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )

}


export default AdminDashboard;