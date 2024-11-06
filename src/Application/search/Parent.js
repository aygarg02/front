import React, { useState } from 'react';
import Search from './Search'; // Adjust the import path as needed
import './Parent.css'
import Stack from '@mui/joy/Stack';
import { Navigate } from 'react-router-dom';
import LinearProgress from '@mui/joy/LinearProgress';
import { useSelector } from 'react-redux';
import { selectLink } from '../../GlobalState';
function Parent() {
    const link = useSelector(selectLink);
    const [results, setResults] = useState([]);
    const [load,setLoad]=useState(false);
    const [clicked,setClicked]=useState(false);
    const handleSearch = async ({ query, selectedOption }) => {
        try {
            setClicked(true);
            
          
            const response = await fetch(`${link}/data?query=${encodeURIComponent(selectedOption)}&searchFor=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data)
            setResults(data);
            setLoad(true); // Assuming your API returns an array of results
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display a message to the user)
        }
    };
    

    return (
        <div className="app">
           
            <Search onSearch={handleSearch} />

          {
            clicked && !load &&  (
<Stack spacing={2} sx={{ flex: 1 }}>
      {/* <LinearProgress variant="solid" /> */}
      {/* <LinearProgress variant="soft" /> */}
      {/* <LinearProgress variant="outlined" /> */}
      <LinearProgress variant="plain" />
    </Stack>
            )
          }
            <div className="results">
                {load
                 &&  results.length>0 
                 && 
            <table className="response-table">
                        <thead>
                            <tr>
                                <th>Serial No:</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Patient ID</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    {Object.entries(item).map(([key, value]) => (
                                    <td> 

                                     {value}
                                    </td>
                                ))}
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>

                        }
            {results.length===0 &&load && <center>No record found...</center>}
            </div>
        </div>
    );
}

export default Parent;
