import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const profileRedirect = () => {
        navigate('/profile');
    }

    const logout = () => {
        sessionStorage['user'] = null;
        navigate('/');
    }

    return (
        <div className='card'>
            <h1>Welcome, admin!</h1>
            <p>Here you can check/change your profile data   </p>
            <button onClick={profileRedirect}>Profile</button>

            <p>You can also log out: </p>
            <button onClick={logout}>Log out</button>

            <p>Here you can see all request for verification: </p>
            <Link to="/salesmans"><label>Verification requests &nbsp;</label></Link>
        </div>
        
    )

}


export default AdminDashboard;