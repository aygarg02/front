import React, { useState } from 'react';
import './DR.css';
import Det from './Detail.js';
import { useSelector } from "react-redux"; // Import useSelector

import { selectLink } from '../../GlobalState';
const DR = () => {
  
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const  [patientId,setPatientId]=useState('');
  const link = useSelector(selectLink);
  const [chan,setChan]=useState(false);
  // const { isLoggedIn, patientId, } = useSelector((state) => state.auth);


  const handleidChange = (e) => {
    setPatientId(e.target.value);
    setResult('');
    setError('');  
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
        setChan(true)
             

  }

  return (
    (chan)?<div>
      <Det patientId={patientId}/>
    </div>
    :

    <div className="container">

      <h1>Search Patient Records</h1>



      <form onSubmit={handleSubmit} className="form">
      <input
          type="text"
            // Bind the ID value
          onChange={handleidChange}
          placeholder="Enter ID"
          className="id-input"
        />
        <br></br>
        
      
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      
    </div>
  );
};

export default DR;
