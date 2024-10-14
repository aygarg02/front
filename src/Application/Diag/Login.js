// src/Login.js
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { login  } from '../../GlobalState'; // Import your Redux action to update global state

const Login = () => {
    const dispatch = useDispatch(); // Use dispatch to trigger actions

    const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);
    
    // Access global state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Assuming password field acts as an email
    const [responseData, setResponseData] = useState(null); // State to hold the API response

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `https://jpvc91vn-8080.inc1.devtunnels.ms/details?name=${username}&email=${password}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const json = await response.json();
            setResponseData(json);
    
            // Save login data to localStorage
            localStorage.setItem('loginData', JSON.stringify({
                patientId: json.patientId,
                name: json.name,
                email: json.email,
                isLoggedIn: true,
            }));
    
            // Dispatch the login action to Redux
            dispatch(login({
                patientId: json.patientId,
                name: json.name,
                email: json.email,
                isLoggedIn: true,
            }));
    
            console.log('Request successful:', json);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="login-container">
            <h2><b>Doctor Login</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password (or Email)</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>

          

            
        </div>
    );
};

export default Login;
