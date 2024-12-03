import React, { useState } from 'react';
import './DR.css';
import { useSelector } from "react-redux"; // Import useSelector

import { selectLink } from '../../GlobalState';
const DR = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');  // Store image URL to display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patientId, setPatientId] = useState('');
  const link = useSelector(selectLink);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult('');
    setError('');
  };

  const handleIdChange = (e) => {
    setPatientId(e.target.value);
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return; // No image selected

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      console.log("Sending request...");
      
      // Fetch prediction from the first API
      const response = await fetch('https://zgsn772h-9800.inc1.devtunnels.ms/generate-grad-cam', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to fetch the prediction');

      // Get the image blob from the response
      const imageBlob = await response.blob();
      console.log(imageBlob);

      // Convert the image blob to a URL that can be used as a source for an <img> tag
      const imageUrl = URL.createObjectURL(imageBlob);

      // Set the image URL to display the image
      setResult(imageUrl);

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
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        <br />
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Upload Image'}
        </button>
      </form>

      {result && (
        <div className="result success">
          <img src={result} alt="Grad-CAM Result" style={{ width: '100%', maxWidth: '600px' }} />
        </div>
      )}
      {error && <div className="result error">{error}</div>}
    </div>
  );
};

export default DR;
