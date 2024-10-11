// src/Login.js
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { login  } from '../../GlobalState'; // Import your Redux action to update global state

const Login = () => {
    const dispatch = useDispatch(); // Use dispatch to trigger actions
    const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth); // Access global state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Assuming password field acts as an email
    const [responseData, setResponseData] = useState(null); // State to hold the API response

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Create the URL with query parameters
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

            const json = await response.json(); // Get the JSON response
            setResponseData(json); // Save the response to state

            // Dispatch action to update the global state with the response
            console.log(json.name);
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
            <h2>Login</h2>
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

            {responseData && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}

            
        </div>
    );
};

export default Login;
