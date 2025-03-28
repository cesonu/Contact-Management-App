import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import ContactList from './ContactList';

const App = () => {
  return (
    <Router>
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/" element={<ContactList />} />  {/* Use element prop instead of component */}
      </Routes>
    </Router>
  );
};

export default App;
