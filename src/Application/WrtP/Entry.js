// src/Login.js
import React, { useState } from 'react';
import './Entry.css'
const Entry = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Assuming password field acts as an email
    const [responseData, setResponseData] = useState(null); // Initialize as null

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the URL with query parameters
            const url = `https://jpvc91vn-8080.inc1.devtunnels.ms/detailsaddOns?name=${username}&email=${email}`;

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
        }
    };
    const convert = (timestamp) => {
        const date = new Date(parseInt(timestamp)); // Convert timestamp to an integer
        return date.toLocaleString(); // Converts to a readable date string
    };
    const DownloadButton = async ( imagePath ) => {
    
      console.log("this is the calue",imagePath);
            try {
                // Fetch the image from the API
                const response = await fetch(`https://jpvc91vn-8080.inc1.devtunnels.ms/api/images/home?imageUrl=${imagePath}`, {
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
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', imagePath.split('/').pop()); // Set the file name for download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); // Remove the link after download
    
            } catch (error) {
                console.error('Error downloading the image:', error);
            }
        
    }
    return (
        <>
            {!responseData ? ( // Check if responseData is null
                <div className="login-container">
                    <h2><b>Search for Patient:</b></h2>
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
                            <label htmlFor="password">Email </label>
                            <input
                                type="text"
                                id="password"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Details of Patient  : {username.toUpperCase()} </h3>
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
                                    <td>{index+1}</td>
                                    {Object.entries(item).map(([key, value]) => (
                                    <td> 

                                        {key==='dateWrt'?convert(value):key==='imagePath'? <button onClick={()=>DownloadButton(value)} className="btn-download">Download</button>:value}
                                    </td>
                                ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Entry;
