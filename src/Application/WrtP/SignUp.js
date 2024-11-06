import React, { useEffect, useState, useRef } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLink } from '../../GlobalState';
export default function SignUp() {
    const link = useSelector(selectLink);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [popUpMess, setPopUpMess] = useState('');
    const popupRef = useRef(null);
      const  navigate=useNavigate();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setPopUp(false);
                setEmail('');
                setUsername('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setPopUp]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("New entry");
            // Make sure there's no space in the URL
            const url = `${link}/saveUser?name=${username}&email=${email}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Check if response is JSON before parsing
                let errorResponse;
                try {
                    errorResponse = await response.json();
                } catch (e) {
                    errorResponse = { message: "Unknown error occurred." };
                }
                setPopUpMess(errorResponse.message); // Display the message from the error
                setPopUp(true);
                return; // Exit the function after setting the error message
            }

            // Assuming the backend returns a success message on successful registration
            const json = await response.json();
            setPopUpMess(json.message); // Show the success message
            setPopUp(true);
        } catch (error) {
            setPopUpMess("Network Error while registering");
            setPopUp(true);
            console.error('Error:', error);
        }
    };
    const handleOnClick=()=>{
        navigate('/Login');
    }

    return (
        <div className="login-container">
            {popUp && (
                <div className="popup">
                    <div className="popup-content" ref={popupRef}>
                        <p>{popUpMess}</p>
                    </div>
                </div>
            )}

            <h2><b>Enter The Details of New Patient:</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Register</button>
                <button onClick={handleOnClick} className="search-button">Login</button>
            </form>
        </div>
    );
}
