import React, { useState } from "react";  
import { useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { LogInUser } from "../services/UserServices";
import jwt_decode from "jwt-decode";
import { RegisterUser } from "../services/UserServices";

const LogIn = (/*{handleKorisnikInfo}*/) => {


    const navigate = useNavigate();
    sessionStorage.setItem("isAuth", JSON.stringify(false));
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("user", "");

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const [register, setRegister] = useState(false);
    const[user, setUser] = useState({});

    const registerBtn = () => {
        // Toggle the value when the button is clicked
        navigate('/register');
    };

    const handleCallbackResponse = async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);

        const username = userObject.name;
        const email = userObject.email;
        const password = userObject.email;
        
        const fullName = userObject.name;
        const dateOfBirth = new Date();
        const userType = 'CUSTOMER';
        const verificationStatus = 'ACCEPTED';
        const deliveryPrice = 0;
        const address = 'Trenutna adresa';
        const userImage = userObject.picture;
        const verified = true;

        const korisnikJSON = JSON.stringify({
            username,
            email,
            password,
            fullName,
            dateOfBirth,
            userType,
            address,
            verificationStatus, 
            deliveryPrice,
            userImage});

        const data = await RegisterUser(korisnikJSON);
        if(data !== null){
            sessionStorage.setItem('isAuth', JSON.stringify(true));
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('korisnik', JSON.stringify(data.korisnikDto));
            //handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
            alert("Successfull registration by Google!");
            redirectTo(userType);

        } else {
            setInputsToEmpty();
            sessionStorage.setItem('isAuth', JSON.stringify(false));
            //handleKorisnikInfo(false);
        }

    }
  
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "351983249943-bd8bcpbqho5kctg78pngrmvf9dlott43.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "medium"}
      )
    }, []);

    /* const handleCallbackResponse = async (response) => {
        console.log("Token: " + response.credential);

        var userObject = jwt_decode(response.credential)
        var email = userObject.email;
        var lozinka = userObject.password;

        const data = await LoginUser(email, lozinka);
        if(data !== null){
            sessionStorage.setItem("isAuth", JSON.stringify(true));
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("korisnik", JSON.stringify(data.userDto));
            const tipKorisnika = data.userDto.tipKorisnika; // propertiji su mala slova
            handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
            alert("Uspesno ste se logovali");
            redirectTo(tipKorisnika);
        }
        else{
            
            sessionStorage.setItem("isAuth", false);
            handleKorisnikInfo(false); //prvo se postave podaci pa se re reneruje
            setInputsToEmpty();
        }

    } */

    //verifikacija korisnika preko gmaila
    /* useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: "outline", size:"medium"}
        )
    }, []) */



    const setInputsToEmpty = () => {
        setEmail('');
        setPassword(''); 
    }

    const redirectTo = (tipKorisnika) => {
        if(tipKorisnika === 'ADMIN'){
            navigate('/adminDashboard');
        }
        else if(tipKorisnika === 'SALESMAN'){
            navigate('/salesmanDashboard');
        }
        else if(tipKorisnika === 'CUSTOMER'){
            navigate('/customerDashboard');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email.length === 0 || password.length === 0) {
            setError(true);
            return;
        }

        const data = await LogInUser(email, password);
        if(data !== null){
            sessionStorage.setItem("isAuth", JSON.stringify(true));
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.userDto));
            const tipKorisnika = data.userDto.UserType; // propertiji su mala slova
            //handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
            alert("Successfull login!");
            redirectTo(tipKorisnika);
        }
        else{
            
            sessionStorage.setItem("isAuth", false);
            //handleKorisnikInfo(false); //prvo se postave podaci pa se re reneruje
            setInputsToEmpty();
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
            {/* {register ? <Register /> : null} */}

            <br></br> <br></br>
            You can also sign in by Google here:
            <div id="signInDiv">
            </div>
            
        </div>
    );


}

export default LogIn;