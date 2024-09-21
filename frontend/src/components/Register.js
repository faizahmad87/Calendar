import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

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
   const res = await axios.post('http://localhost:5000/api/auth/register', {
    email,
    password
   });

   // Store the token and redirect to calendar
   localStorage.setItem('token', res.data.token);
   navigate('/calendar');
  } catch (err) {
   console.error(err);
   setError(err.response.data.msg || 'Registration failed');
  }
 };

 return (
  <div>
   <h2>Register</h2>
   {error && <p style={{color: 'red'}}>{error}</p>}
   <form onSubmit={handleRegister}>
    <input
     type="email"
     value={email}
     onChange={e => setEmail(e.target.value)}
     placeholder="Email"
     required
    />
    <input
     type="password"
     value={password}
     onChange={e => setPassword(e.target.value)}
     placeholder="Password"
     required
    />
    <input
     type="password"
     value={confirmPassword}
     onChange={e => setConfirmPassword(e.target.value)}
     placeholder="Confirm Password"
     required
    />
    <button type="submit">Register</button>
   </form>
  </div>
 );
}

export default Register;
