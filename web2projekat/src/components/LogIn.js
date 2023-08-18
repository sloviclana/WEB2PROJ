import React, { useState } from "react";  
import { useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { LogInUser } from "../services/UserServices";

const LogIn = () => {


    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const [register, setRegister] = useState(false);

    const registerBtn = () => {
        // Toggle the value when the button is clicked
        setRegister(!register);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email.length === 0 || password.length === 0) {
            setError(true);
            return;
        }


    }

    return (
        <div className="card">
            <h2 className="uiCenterAlignedHeader">Log in</h2>
            <form className="loginForm" onSubmit={handleSubmit}>

                <div className="field">
                    <label>Email  </label>
                    <input type="email"
                           value={email}
                           name="email"
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}/>
                    {error && email.length === 0 ? <div className="redLabel">You must enter the email address!</div> : null}
                </div>

                <div className="field">
                    <label>Password  </label>
                    <input type="password"
                           value={password}
                           name="password"
                           placeholder="Password"
                           onChange={(p) => setPassword(p.target.value)}/>
                    {error && password.length === 0 ? <div className="redLabel">You must enter your password!</div> : null}
                </div>
                
                <div className="buttons-flex">
                    <button className="blueButton" type="submit">Log in</button>
                    <div id="singInDiv"></div>
                </div>

            </form>

            <p>Do not have an account? Please sign up here:     </p> 
            <button className='blueButton' onClick={registerBtn}>Sign up</button>
            {register ? <Register /> : null}
            
        </div>
    );


}

export default LogIn;