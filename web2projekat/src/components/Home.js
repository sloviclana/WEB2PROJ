import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LogIn from "./LogIn";
import Register from "./Register";

const Home = () => {

    const [register, setRegister] = useState(false);

    const registerBtn = () => {
        // Toggle the value when the button is clicked
        setRegister(!register);
    };

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
                            <LogIn></LogIn>

                            Do not have an account? Please sign up here:   
                            <button className='blueButton' onClick={registerBtn}>Sign up</button>
                            {register ? <Register /> : null}
                        </div>

                        
                    </div>
                </h1>
            </div>
        </div>
            
            
        </>
    );
}

export default Home;