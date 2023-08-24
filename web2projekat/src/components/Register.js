import React from "react";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import axios from 'axios';
import { RegisterUser } from "../services/UserServices";
import UploadImage from "./UploadImage";

const Register = () => {

    const navigate = useNavigate();
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[fullName, setFullName] = useState('');
    const[address, setAddress] = useState('');
    const[dateOfBirth, setDateOfBirth] = useState('');
    const[username, setUsername] = useState('');
    const[image, setImage] = useState('');
    const[userType, setUserType] = useState('');
    const[error, setError] = useState(false);
    const[deliveryPrice, setDeliveryPrice] = useState('');
    const[isVerified, setIsVerified] = useState('');
    const[verificationStatus, setVerificationStatus] = useState('');
    const[salesmanSelected, setSalesmanSelected] = useState(0);


    const setInputsToEmpty = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setPassword2('');
        setFullName('');
        setAddress('');
        setDateOfBirth('');
        setUserType('');
        setImage('');
        setDeliveryPrice('');
        setIsVerified('');
    }

    const handleSelectChange = (event) => {
        setUserType(event.target.value);
        {userType === "SALESMAN" ? setSalesmanSelected(1) : setSalesmanSelected(0);}
      };

    const redirectTo = () => {
        navigate('/');
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        //uraditi provere za lozinke, tj. da li se prva i druga poklapaju i da li su uneta stva polja

        /*
        if(username.length === 0 || email.length === 0 || password.length === 0 || password2.length === 0 
            || fullName.length === 0 || dateOfBirth === null || address.length === 0 || password !== password2
            || deliveryPrice === 0 || image.length === 0){
                setError(true);
                return;
            }
        */

        if(password === password2){
            const userJSON = {
                Username : username,
                Email : email,
                Password : password,
                FullName : fullName,
                DateOfBirth : dateOfBirth,
                UserType : userType,
                Address : address,
                DeliveryPrice : deliveryPrice,
                Verified : false,
                VerificationStatus: verificationStatus,
                UserImage : image
            }
        ;


            const data = await RegisterUser(userJSON);

            if(data !== null){
                //sessionStorage.setItem('isAuth', JSON.stringify(true));
                //sessionStorage.setItem('token', data.token)
                //sessionStorage.setItem('user', JSON.stringify(data.userDto));
                //handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
                alert("Succesfull registration!!!");
                redirectTo();

            } else {
                setInputsToEmpty();
                sessionStorage.setItem('isAuth', JSON.stringify(false));
                //handleKorisnikInfo(false);
            }
        }
    }

    return (

        <div className="card">
            <h2>Register (sign up): </h2>
            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Full name </label>
                    <input type="text"
                            value={fullName}
                            name="fullName"
                            placeholder="Full name"
                            onChange={(e) => setFullName(e.target.value)}/>
                    {error && fullName.length === 0 ? <div className="redLabel">You must enter your name!</div> : null}
                </div>

                <div className="field">
                    <label>Username </label>
                    <input type="text"
                            value={username}
                            name="username"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}/>
                    {error && username.length === 0 ? <div className="redLabel">You must enter your username!</div> : null}
                </div>

                <div className="field">
                    <label>Password </label>
                    <input type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    {error && password.length === 0 ? <div className="redLabel">You must enter your password!</div> : null}
                </div>

                <div className="field">
                    <label>Confirm your password</label>
                    <input type="password"
                            value={password2}
                            name="password2"
                            placeholder="Confirm password"
                            onChange={(e) => setPassword2(e.target.value)}/>
                    {error && password2.length === 0 ? <div className="redLabel">You must confirm your password!</div> : null}
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

                <div className="field">
                            <label>Address </label>
                            <input type="text"
                                value={address}
                                name="address"
                                placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}/>
                            {error && address.length === 0 ? <div className="redLabel">You must enter address!</div> : null}
                </div>

                <div className="field">
                            <label>User type </label>
                            <select value={userType} name="userType" placeholder="User type" onChange={handleSelectChange}>
                                <option value="">Select user type</option>
                                {/* <option value={'ADMIN'}>ADMIN</option> */}
                                <option value={'SALESMAN'}>SALESMAN</option>
                                <option value={'CUSTOMER'}>CUSTOMER</option>
                            </select>
                            {error && userType.length === 0 ? <div className="redLabel">You must select user type!</div> : null}
                </div>

                {salesmanSelected === 0 ? 
                <div className="field">
                    <label>Since you are a salesman, you must enter your delivery price!</label>
                    <input type="number" 
                    value = {deliveryPrice} 
                    name = "deliveryPrice" 
                    placeholder="Delivery price" 
                    onChange={(e) => setDeliveryPrice(e.target.value)}>
                </input> 
                {error && deliveryPrice.length === 0 ? <div className="redLabel">You must enter delivery price!</div> : null}
                </div> : null}
                
                
                

                <div className="field">
                        <label>Image: </label> 
                        <UploadImage slika={image} setSlika={setImage}></UploadImage>
                </div>

                <div className="buttons-flex">
                        <button className="blueButton" type="submit" onClick={handleSubmit}>Sign up</button>
                        <div id="singInDiv"></div>
                </div>

            </form>
            <br></br>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>

        


    );
};

export default Register;