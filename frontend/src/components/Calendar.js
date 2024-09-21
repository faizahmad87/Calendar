import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';

function Calendar() {
 const [events, setEvents] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchEvents = async () => {
   try {
    const user = auth.currentUser;
    if (user) {
     const res = await axios.get(
      `http://localhost:5000/api/events/${user.uid}`
     );
     setEvents(res.data);
     setLoading(false);
    }
   } catch (error) {
    console.error('Error fetching events', error);
    setLoading(false);
   }
  };

  fetchEvents();
 }, []);

 if (loading) return <p>Loading events...</p>;

 return (
  <div>
   <h2>Your Events</h2>
   <Link to="/create-event">Create New Event</Link>
   <ul>
    {events.map(event => (
     <li key={event.id}>
      {event.title} on {new Date(event.date).toDateString()}
      <Link to={`/edit-event/${event.id}`}>Edit</Link>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default Calendar;
