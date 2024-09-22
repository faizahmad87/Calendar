import React, {useEffect, useState} from 'react';
import {
 BrowserRouter as Router,
 Route,
 Routes,
 Navigate
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CalendarEvent from './components/Calendar';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import './global.scss'; // Import the global SCSS file

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
    <Route
     path="/"
     element={
      isAuthenticated ? <Navigate to="/calendar" /> : <Navigate to="/login" />
     }
    />
    <Route path="/calendar" element={<CalendarEvent />} />
    <Route path="/create-event" element={<CreateEvent />} />
    <Route path="/edit-event/:id" element={<EditEvent />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
   </Routes>
  </Router>
 );
}

export default App;
