import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { GetAllArticles } from '../services/ArticleServices';
import OrderDto from '../models/OrderDto';
import OrderArticleDto from '../models/OrderArticleDto';
import { AddNewOrder } from '../services/OrderService';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const[articles, setArticles] = useState([]);
    const[selectedValues, setSelectedValues] = useState([]);
    const[comment, setComment] = useState('');
    const[deliveryAddress, setDeliveryAddress] = useState('');
    const[price, setPrice] = useState(0);
    const[priceWithDelivery, setPriceWithDelivery] = useState(0);
    //setPrice(0);

    const[articlesForOrder, setArticlesForOrder] = useState([]);
    const[order, setOrder] = useState(new OrderDto(null));
   

    const profileRedirect = () => {
        navigate('/profile');
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await GetAllArticles();
            if (response) {
                setArticles(response.articlesArray); // Set the fetched data to the state
            }
          } catch (error) {
            // Handle error
          }
        }
    
        fetchData();
      }, []);

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

    const handleSelectChange = (articleId, e) => {
        setSelectedValues({
            ...selectedValues,
            [articleId]: parseInt(e.target.value, 10),
          });

        // You can store this selectedQuantity in your component's state or use it directly when needed
      };

    return (
        <div className='card'>
            <h1>Welcome, customer!</h1>
            <p>Here you can check/change your profile data   </p>
            <button onClick={profileRedirect}>Profile</button>

            <p>You can also log out: </p>
            <button onClick={logout}>Log out</button>

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

            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        
    )
}

export default CustomerDashboard;