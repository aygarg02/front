import React, { useState } from 'react';
import './Entry.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { useSelector } from 'react-redux';
import { selectLink } from '../../GlobalState';
const Entry = () => {
    const link = useSelector(selectLink);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [responseData, setResponseData] = useState(null); 
    const [Clicked, setClicked] = useState(false); 

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Request started");

            setClicked(true); // Set Clicked to true before the request starts

            // Create the URL with query parameters
            const url = `${link}/detailsaddOns?name=${username}&email=${email}`;

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

            console.log('Request successful:', json);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setClicked(false); // Reset Clicked to false after the request completes
        }
    };

    const convert = (timestamp) => {
        const date = new Date(parseInt(timestamp)); // Convert timestamp to an integer
        return date.toLocaleString(); // Converts to a readable date string
    };
    const DownloadButton = async (imagePath) => {
        console.log("Downloading image:", imagePath);
        try {
            setClicked(true); // Set Clicked to true when downloading
    
            // Fetch the image from the API
            const response = await fetch(`${link}/api/images/home?imageUrl=${imagePath}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const blob = await response.blob(); // Get the image data as a blob
            const url = window.URL.createObjectURL(blob); // Create a URL for the image
    
            // Create a temporary link element to trigger download
            const tempLink = document.createElement('a'); // Renamed from `link` to `tempLink`
            tempLink.href = url;
            tempLink.setAttribute('download', imagePath.split('/').pop()); // Set the file name for download
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink); // Remove the link after download
        } catch (error) {
            console.error('Error downloading the image:', error);
        } finally {
            setClicked(false); // Reset Clicked state after download
        }
    };

    // Function to navigate to SignUp URL
    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to SignUp URL
    };

    return (
        <>
            {!responseData && !Clicked ? (
                // Show the form if responseData is null and Clicked is false
                <div className="login-container">
                    <h2 style={{fontSize:'20px'}}><b>Search for Patient</b></h2>
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
                            <label htmlFor="password">Email</label>
                            <input
                                type="text"
                                id="password"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='button-handle'>
                       <button type="submit" className="btn" >Login</button>
                        <button onClick={handleSignUpClick}>SignUp</button> 
                        </div>
                    </form>
                   {/* Button to switch to SignUp URL */}
                </div>
            ) : Clicked ? (
                // Show a loading message while waiting
                <Box sx={{ width: 300, height: 500 }}> {/* Set width and height appropriately */}
                    <Skeleton variant="rectangular" width={500} height={25}  style={{marginTop:30}} />
                    <Skeleton variant="rectangular" width={1100} height={50} animation="wave" style={{ marginTop: 30 }} />
                    <Skeleton variant="rectangular" width={1100} height={75} animation={false} style={{ marginTop: 3}} />
                    <Skeleton variant="rectangular" width={1100} height={75} animation={true} style={{ marginTop: 3}} />
                    <Skeleton variant="rectangular" width={1100} height={75} animation={false} style={{ marginTop: 3}} />
                    <Skeleton variant="rectangular" width={1100} height={75} animation={true} style={{ marginTop: 3}} />
                </Box>
            ) : responseData.length > 0 ? (
                // Display the responseData when available
                <div>
                    <h3>Details of Patient: {username.toUpperCase()}</h3>
                    <table className="response-table">
                        <thead>
                            <tr>
                                <th>Serial No:</th>
                                <th>Patient ID</th>
                                <th>Date</th>
                                <th>Image Path</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {Object.entries(item).map(([key, value]) => (
                                        <td key={key}>
                                            {key === 'dateWrt' ? convert(value) : 
                                            key === 'imagePath' ? (
                                                <button
                                                    onClick={() => DownloadButton(value)}
                                                    className="btn-download"
                                                >
                                                    Download
                                                </button>
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </>
    );
};

export default Entry;
