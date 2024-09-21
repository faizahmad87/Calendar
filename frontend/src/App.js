import React, {useEffect, useState} from 'react';
import {
 BrowserRouter as Router,
 Route,
 Routes,
 Navigate
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Calendar from './components/Calendar';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';

function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 // Check for the token in localStorage
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
   setIsAuthenticated(true);
  } else {
   setIsAuthenticated(false);
  }
 }, []);

 return (
  <Router>
   <Routes>
    {isAuthenticated ? (
     <>
      <Route path="/calendar" element={<Calendar />} />
     </>
    ) : (
     <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/home" element={<Navigate to="/login" />} />
     </>
    )}
   </Routes>
  </Router>
 );
}

export default App;
