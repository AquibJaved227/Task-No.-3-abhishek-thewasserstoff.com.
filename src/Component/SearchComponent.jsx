
import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [city, setCity] = useState('');  // State to store the input city name

  const handleSearch = () => {
    onSearch(city);  // Trigger the search function passed as a prop
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
