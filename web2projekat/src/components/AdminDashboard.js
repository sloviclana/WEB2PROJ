import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();

    const profileRedirect = () => {
        navigate('/profile');
    }

    return (
        <div className='card'>
            <h1>Welcome, admin!</h1>
            <p>Here you can check/change your profile data   </p>
            <button onClick={profileRedirect}>Profile</button>
        </div>
        
    )

}


export default AdminDashboard;