import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import { UpdateUserProfile } from "../services/UserServices";
import { Outlet, Link } from "react-router-dom";
import UploadImage from "./UploadImage";
//import { useHistory } from 'react-router-dom';

const Profile = () => {

    const user = sessionStorage['user'];
    const userDto = JSON.parse(user);
    const navigate = useNavigate();
    //const history = useHistory();
    
    const[email, setEmail] = useState(userDto.Email);
    const[password, setPassword] = useState(userDto.Password);
    const[password2, setPassword2] = useState(userDto.Password);
    const[fullName, setFullName] = useState(userDto.FullName);
    const[address, setAddress] = useState(userDto.Address);
    const[dateOfBirth, setDateOfBirth] = useState( new Date(userDto.DateOfBirth) );
    const[username, setUsername] = useState(userDto.Username);
    const[image, setImage] = useState(userDto.UserImage);
    const[userType, setUserType] = useState(userDto.UserType);
    const[error, setError] = useState(false);
    const[deliveryPrice, setDeliveryPrice] = useState('');
    const[isVerified, setIsVerified] = useState(userDto.Verified);
    const[verificationStatus, setVerificationStatus] = useState(userDto.VerificationStatus);

    //const[backLink, setBackLink] = useState('');
    
    /* setEmail(userDto.email);
    setAddress(userDto.address);
    setDateOfBirth(userDto.dateOfBirth);
    setDeliveryPrice(userDto.deliveryPrice);
    setUsername(userDto.username);
    setUserType(userDto.userType);
    setImage(userDto.image);
    setFullName(userDto.fullName);
    setPassword(userDto.password); */
    //setIsVerified(userDto.isVerified)

    const redirectTo = (userType) => {
        if(userType === 'ADMIN'){
            navigate('/adminDashboard');
        }
        else if(userType === 'SALESMAN'){
            navigate('/salesmanDashboard');
        }
        else if(userType === 'CUSTOMER'){
            navigate('/customerDashboard');
        }
    }

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
        //setImage('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                Verified : isVerified,
                VerificationStatus : verificationStatus,
                UserImage : image
            };

            const data = await UpdateUserProfile(userJSON);

            if(data !== null){
                //sessionStorage.setItem('isAuth', JSON.stringify(true));
                //sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('user', JSON.stringify(data.userDto));
                //handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
                alert("Succesfull profile update!!!");
                redirectTo(userType);

            } else {
                setInputsToEmpty();
                sessionStorage.setItem('isAuth', JSON.stringify(false));
                //handleKorisnikInfo(false);
            }
            //redirectTo(userType);
        }

    }

    const handleSelectChange = (event) => {
        setUserType(event.target.value);
    }

    return (
        <div className="card">
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

                {/* <div className="field">
                            <label>Email </label>
                            <input type="email"
                                value={email}
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}/>
                            {error && email.length === 0 ? <div className="redLabel">You must enter the email address!</div> : null}
                </div> */}

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

                {/* <div className="field">
                            <label>User type </label>
                            <select value={userType} name="userType" placeholder="User type" onChange={handleSelectChange}>
                                <option value="">Select user type</option>
                                <option value={'ADMIN'}>ADMIN</option>
                                <option value={'SALESMAN'}>SALESMAN</option>
                                <option value={'CUSTOMER'}>CUSTOMER</option>
                            </select>
                            {error && userType.length === 0 ? <div className="redLabel">You must select user type!</div> : null}
                </div> */}

                {/* {userType === "SALESMAN" ? <div className="field">
                    <label>Delivery price</label>
                    <input type="number" 
                        value = {deliveryPrice} 
                        name = "deliveryPrice" 
                        placeholder="Delivery price" 
                        onChange={(e) => setDeliveryPrice(e.target.value)}>
                    </input> 
                    {error && deliveryPrice.length === 0 ? <div className="redLabel">You must enter delivery price!</div> : null}
                </div> : null} */}
                

                <div className="field">
                <label>Image: </label>
                <UploadImage slika={image} setSlika={setImage}></UploadImage>
                    {error && image.length === 0 ?  <div className="ui pointing red basic label">
                            You must choose image!
                            </div>
                        : null}
                </div>

                <div className="buttons-flex">
                        <button className="blueButton" type="submit" onClick={handleSubmit}>Update profile</button>
                        <div id="singInDiv"></div>
                </div>

            </form>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default Profile;