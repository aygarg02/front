import React, { useState } from 'react';
import './search.css';

function Search({ onSearch }) {
    const [query, setQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('Email'); // Set default value for dropdown

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option
    };

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch({ query, selectedOption }); // Pass both query and selected option
    };

    return (
        <div className='searchbar'>
            <form onSubmit={handleSearch} className="search-bar">
                <select value={selectedOption} onChange={handleSelectChange} className="search-dropdown">
                    <option value="email">Email</option>
                    <option value="name">Name</option>
                    <option value="patientId">PatientId</option>
                </select>
                <input 
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
