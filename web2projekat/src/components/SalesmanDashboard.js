import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

const SalesmanDashboard = () => {
    const navigate = useNavigate();

    const profileRedirect = () => {
        navigate('/profile');
    }

    const newArticle = () => {
        navigate('/newArticle');
    }

    const seeOrders = () => {
        navigate('/salesmansOrders');
    }

    const user = sessionStorage['user'];
    const userDto = JSON.parse(user);
    const[verificationStatus, setVerificationStatus] = useState(userDto.VerificationStatus);


    const logout = () => {
        sessionStorage['user'] = null;
        sessionStorage['token'] = null;
        sessionStorage['isAuth'] = JSON.stringify(false);
        navigate('/');
    }

    const actionsElement = document.getElementById('actions');

    const handleActions = () => {
        if(verificationStatus === "PROCCESSING") {

            const message = "You are not allowed to take actions, because your account verification status is PROCCESSING.";
            ReactDOM.render(message, actionsElement);

        } else if(verificationStatus === "DENIED") {
            
            const message = "You are not allowed to take actions, because your account verification status is DENIED.";
            ReactDOM.render(message, actionsElement);

        }
         else {
            ReactDOM.render("You can create new articles and see previous orders!", actionsElement);
        }
    }

    return (
        <div className='card'>
            <h1>Welcome, salesman!</h1>
            <p>Here you can check/change your profile data   </p>
            <button onClick={profileRedirect}>Profile</button>

            <p>You can also log out: </p>
            <button onClick={logout}>Log out</button>

            {/*<p>See another actions: </p>*/}
            {/* <button onClick={handleActions}>Actions</button> */}
            <br></br>
            <br></br>
            {verificationStatus === "PROCCESSING" ? 'You cannot take any actions since your account verification status is proccessing!' : ''}
            {verificationStatus === "DENIED" ? 'You cannot take any actions since your account verification status is denied!' : ''}
            {verificationStatus === "ACCEPTED" ? <div>
                                                    <button onClick={newArticle}>Create new article</button>
                                                    <button onClick = {seeOrders}>See orders</button>
                                                    </div> : ''}

            <div id='actions' className='actions'></div>

        </div>
        
    )

}


export default SalesmanDashboard;