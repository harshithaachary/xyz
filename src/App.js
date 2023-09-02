 import React from 'react';
 import PatientList from './components/PatientList';
 import PatientForm from './components/PatientForm';
 import SearchBar from './components/SearchBar';

 const App = () => {
  const handleSearch = (searchResults) => {
    console.log('Search results:', searchResults);
     // Handle search results
  };

   return (
     <div>
       <h1>Medical Records</h1>
       <PatientForm />
       <SearchBar onSearch={handleSearch} />
      <PatientList />
    </div>
   );
 };

 export default App;


