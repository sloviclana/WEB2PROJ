import React from "react";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles


const Register = () => {

    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[fullName, setFullName] = useState('');
    const[address, setAddress] = useState('');
    const[dateOfBirth, setDateOfBirth] = useState('');
    const[username, setUsername] = useState('');
    const[image, setImage] = useState('');
    const[userType, setUserType] = useState('');
    const[error, setError] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email.length === 0 || password.length === 0 || fullName.length === 0 
            || address.length === 0 || username.length === 0 
            ) {
            setError(true);
            return;
        }


    }

    return (

        <div>
            <h2>Register (sign up): </h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Full name </label>
                    <input type="text"
                            value={fullName}
                            name="fullName"
                            placeholder="Full name"
                            onChange={(e) => fullName(e.target.value)}/>
                    {error && fullName.length === 0 ? <div className="redLabel">You must enter your name!</div> : null}
                </div>

                <div className="field">
                    <label>Username </label>
                    <input type="text"
                            value={username}
                            name="username"
                            placeholder="Username"
                            onChange={(e) => username(e.target.value)}/>
                    {error && username.length === 0 ? <div className="redLabel">You must enter your username!</div> : null}
                </div>

                <div className="field">
                    <label>Password </label>
                    <input type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => password(e.target.value)}/>
                    {error && password.length === 0 ? <div className="redLabel">You must enter your password!</div> : null}
                </div>

                <div className="field">
                            <label>Email </label>
                            <input type="email"
                                value={email}
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}/>
                            {error && email.length === 0 ? <div className="redLabel">You must enter the email address!</div> : null}
                </div>

                <div className="field">
                    <label>Date of birth </label>
                    <DatePicker 
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                        dateFormat="dd/MM/yyyy"
                    /> 
                        
                </div>

                <div className="buttons-flex">
                        <button className="blueButton" type="submit">Sign up</button>
                        <div id="singInDiv"></div>
                </div>

            </form>
            
        </div>

        


    );
};

export default Register;