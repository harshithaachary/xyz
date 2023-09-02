import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchPatients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/patients/search?name=${searchQuery}`
      );
      onSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Search Patients</h3>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="button" onClick={searchPatients}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
