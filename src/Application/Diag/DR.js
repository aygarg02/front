import React, { useState } from 'react';
import './DR.css';
import { useSelector } from "react-redux"; // Import useSelector

const DR = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { isLoggedIn, patientId, } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult('');
    setError('');  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return; // No image selected

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      // Fetch prediction from the first API
      const response = await fetch('https://zgsn772h-9800.inc1.devtunnels.ms/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to fetch the prediction');

      const data = await response.json(); // Expecting JSON response
      setResult(data.predicted_label); // Update result
      console.log(patientId);
      // Prepare second form data to save the result
      const formData1 = new FormData();
      formData1.append('file', image); // Add image file
      formData1.append('patientId', patientId); // Add patient ID
      const currentDate = new Date().toISOString()
      formData1.append('date', currentDate); // Add current date
      formData1.append('result', data.predicted_label); // Use predicted label directly

      // Send data to the save API
      const response1 = await fetch('https://jpvc91vn-8080.inc1.devtunnels.ms/save', {
        method: 'POST',
        body: formData1,
      });

      if (!response1.ok) throw new Error('Failed to send data, try again');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Upload and Prediction</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Upload Image'}
        </button>
      </form>
      {result && <div className="result success">{result}</div>}
      {error && <div className="result error">{error}</div>}
    </div>
  );
};

export default DR;
