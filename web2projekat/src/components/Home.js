import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LogIn from "./LogIn";
import Register from "./Register";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <>
        <div className="centered-container">
            <div className="container">
                <h1 className="welcomeTitle">
                    Welcome to the home page of our web shop!

                    <div className="subHeader">
                        Before you continue using our page, please log in into your account.
                        If you do not have account yet, please sing up.

                        <div>
                            
                            <button onClick={handleClick}>Log in</button>
                           
                        </div>

                        
                    </div>
                </h1>
            </div>
        </div>
            
            
        </>
    );
}

export default Home;