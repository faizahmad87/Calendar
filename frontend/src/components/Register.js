import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'; // Import the modular function

function Register() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleRegister = async e => {
  e.preventDefault();

  if (password !== confirmPassword) {
   return setError('Passwords do not match');
  }

  try {
   // Register the user with Firebase
   //    const userCredential = await createUserWithEmailAndPassword(
   //     auth,
   //     email,
   //     password
   //    );
   //    console.log(userCredential);
   //    const user = userCredential.user;

   //    // Get Firebase UID
   //    const firebaseUid = user.uid;
   //    console.log(firebaseUid);
   const res = await axios.post('http://localhost:5000/api/auth/register', {
    email,
    password
    //firebaseUid // Include the Firebase UID
   });

   // Store the token and redirect to calendar
   console.log(res.data);
   localStorage.setItem('token', res.data.token);
   localStorage.setItem('userID', res.data.user.id);
   navigate('/calendar');
  } catch (err) {
   console.error(err);
   setError(err.response.data.msg || 'Registration failed');
  }
 };

 return (
  <>
   <div className="header">
    <div></div>
    <div>Register</div>
    <div></div>
   </div>
   <div className="main-container" style={{alignItems: 'center'}}>
    {error && <p style={{color: 'red'}}>{error}</p>}
    <form onSubmit={handleRegister} className="input-container">
     <input
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Email"
      required
      className="input-element"
     />
     <input
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Password"
      required
      className="input-element"
     />
     <input
      type="password"
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
      placeholder="Confirm Password"
      required
      className="input-element"
     />
     <button type="submit" style={{padding: '12px'}}>
      Register
     </button>
    </form>
   </div>
  </>
 );
}

export default Register;
