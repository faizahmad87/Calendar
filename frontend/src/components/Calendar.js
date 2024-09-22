import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Calendar from 'react-calendar';

// import {auth} from '../firebase';

function CalendarEvent() {
 const [events, setEvents] = useState([]);
 const [displayEvents, setDisplayEvents] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 const userId = localStorage.getItem('userID');
 const [selectedDate, setSelectedDate] = useState('');

 const fetchEvents = async () => {
  setSelectedDate('');
  try {
   const res = await axios.get(`http://localhost:5000/api/events/${userId}`);
   setEvents(res.data);
   setDisplayEvents(res.data);
   console.log(res.data);
   setLoading(false);
  } catch (error) {
   console.error('Error fetching events', error);
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchEvents();
 }, []);

 const handleDelete = async id => {
  try {
   await axios.delete(`http://localhost:5000/api/events/${id}`);
   fetchEvents();
  } catch (error) {
   console.error('Error deleting event:', error);
  }
 };
 const convertToISOStringWithoutUTC = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
 };

 const updateEvent = value => {
  const isoString = convertToISOStringWithoutUTC(value);
  console.log(isoString);
  const filteredEvents = events.filter(event => {
   console.log(event.date);
   return event.date === isoString;
  });
  console.log(filteredEvents);
  setDisplayEvents(filteredEvents);
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
     <div className="calendar-list">
      <div className="list">
       {selectedDate !== '' ? (
        <div className="eventByDate">
         Events of the {selectedDate}
         <button
          onClick={() => {
           fetchEvents();
          }}
         >
          See All Events
         </button>
        </div>
       ) : (
        <div className="eventByDate">All Events</div>
       )}

       {displayEvents.map(event => (
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
      <div style={{width: '40%'}} className="calendar">
       <Calendar
        onChange={value => {
         console.log(value);
         const dateObject = new Date(value);
         const formattedDate = dateObject.toDateString();
         setSelectedDate(formattedDate);
         console.log(formattedDate);
         updateEvent(value);
        }}
        value={selectedDate}
       />
      </div>
     </div>
    </div>
   )}
  </>
 );
}

export default CalendarEvent;
