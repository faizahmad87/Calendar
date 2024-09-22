import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Calendar from 'react-calendar';

// import {auth} from '../firebase';

function CalendarEvent() {
 const [events, setEvents] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 const userId = localStorage.getItem('userID');
 const [value, onChange] = useState(new Date());

 const fetchEvents = async () => {
  try {
   //const user = auth.currentUser;
   //if (user) {
   const res = await axios.get(`http://localhost:5000/api/events/${userId}`);
   setEvents(res.data);
   setLoading(false);
   //}
  } catch (error) {
   console.error('Error fetching events', error);
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchEvents();
 }, []);

 // Function to delete an event by its ID
 const handleDelete = async id => {
  try {
   await axios.delete(`http://localhost:5000/api/events/${id}`);
   // Remove the event from the state after deletion
   //setEvents(events.filter(event => event.id !== id));
   fetchEvents();
  } catch (error) {
   console.error('Error deleting event:', error);
  }
 };

 return (
  <>
   <div className="header">
    <div>Your Events</div>
    <div>
     <button
      onClick={() => {
       localStorage.removeItem('token');
       navigate('/login');
      }}
     >
      Log Out
     </button>
     <button
      onClick={() => {
       navigate(`/create-event`);
      }}
     >
      Create New Event
     </button>
    </div>
   </div>
   {loading ? (
    <p>Loading events...</p>
   ) : (
    <div className="main-container">
     <div className="calendar">
      <div className="list">
       {events.map(event => (
        <div className="list-item">
         <div key={event.id} className="item-title">
          <b>{event.title}</b> on {new Date(event.date).toDateString()}
          <button
           style={{
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '12px'
           }}
           onClick={() => {
            navigate(`/edit-event/${event.id}`);
           }}
          >
           Edit
          </button>
          <button
           style={{
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '12px'
           }}
           onClick={() => handleDelete(event.id)}
          >
           Delete
          </button>
         </div>
         {event?.description && (
          <div className="description">Description: {event?.description}</div>
         )}
        </div>
       ))}
      </div>
      <div style={{width: '40%'}}>
       {/* <Calendar
        onChange={value => {
         console.log(value);
        }}
        value={value}
       /> */}
      </div>
     </div>
    </div>
   )}
  </>
 );
}

export default CalendarEvent;
