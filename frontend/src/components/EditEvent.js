import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function EditEvent() {
 const {id} = useParams(); // Event ID from URL
 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');
 const navigate = useNavigate();
 useEffect(() => {
  const fetchEvent = async () => {
   try {
    const res = await axios.get(`http://localhost:5000/api/events/${id}`);
    const event = res.data;
    setTitle(event.title);
    setDate(event.date.split('T')[0]);
   } catch (error) {
    console.error('Error fetching event', error);
   }
  };

  fetchEvent();
 }, [id]);

 const handleSubmit = async e => {
  e.preventDefault();
  try {
   await axios.put(`http://localhost:5000/api/events/${id}`, {
    title,
    date
   });
   navigate('./calendar'); // Redirect to calendar after updating
  } catch (error) {
   console.error('Error updating event', error);
  }
 };

 return (
  <div>
   <h2>Edit Event</h2>
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
    <button type="submit">Update Event</button>
   </form>
  </div>
 );
}

export default EditEvent;
