import React, {useState} from 'react';
import axios from 'axios';
// import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

function CreateEvent() {
 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');
 const navigate = useNavigate();

 const userID = localStorage.getItem('userID');
 const handleSubmit = async e => {
  e.preventDefault();
  console.log('Submit');
  try {
   //    const user = auth.currentUser;
   //if (user) {
   await axios.post('http://localhost:5000/api/events', {
    title,
    date,
    userId: userID
   });
   navigate('/calendar'); // Redirect to calendar after creating event
   //}
  } catch (error) {
   console.error('Error creating event', error);
  }
 };

 return (
  <>
   <div className="header">
    <div>Create New Event</div>
    <div>
     <button
      onClick={() => {
       navigate(`/calendar`);
      }}
     >
      View Events
     </button>
    </div>
   </div>
   <div className="main-container" style={{alignItems: 'center'}}>
    <form onSubmit={handleSubmit} className="input-container">
     <input
      type="text"
      value={title}
      onChange={e => setTitle(e.target.value)}
      placeholder="Event Title"
      required
      className="input-element"
     />
     <input
      type="date"
      value={date}
      onChange={e => setDate(e.target.value)}
      required
      className="input-element"
     />
     <button type="submit">Create Event</button>
    </form>
   </div>{' '}
  </>
 );
}

export default CreateEvent;
