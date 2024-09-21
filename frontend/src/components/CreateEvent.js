import React, {useState} from 'react';
import axios from 'axios';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

function CreateEvent() {
 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');
 const navigate = useNavigate();
 const handleSubmit = async e => {
  e.preventDefault();
  try {
   const user = auth.currentUser;
   if (user) {
    await axios.post('http://localhost:5000/api/events', {
     title,
     date,
     userId: user.uid
    });
    navigate('./calendar'); // Redirect to calendar after creating event
   }
  } catch (error) {
   console.error('Error creating event', error);
  }
 };

 return (
  <div>
   <h2>Create New Event</h2>
   <form onSubmit={handleSubmit}>
    <input
     type="text"
     value={title}
     onChange={e => setTitle(e.target.value)}
     placeholder="Event Title"
     required
    />
    <input
     type="date"
     value={date}
     onChange={e => setDate(e.target.value)}
     required
    />
    <button type="submit">Create Event</button>
   </form>
  </div>
 );
}

export default CreateEvent;
