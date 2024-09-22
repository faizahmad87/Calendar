import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();
 const handleLogin = async e => {
  e.preventDefault();

  try {
   const res = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password
   });
   console.log(res.data);

   // Store the token and redirect to calendar
   localStorage.setItem('token', res.data.token);
   localStorage.setItem('userID', res.data.user.id);
   navigate('/calendar');
  } catch (err) {
   console.error(err);
   setError(err.response.data.msg || 'Login failed');
  }
 };

 return (
  <>
   <div className="header">
    <div>Login</div>
   </div>
   <div className="main-container" style={{alignItems: 'center'}}>
    {error && <p style={{color: 'red'}}>{error}</p>}
    <form onSubmit={handleLogin} className="input-container">
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
     <button type="submit" style={{padding: '12px'}}>
      Login
     </button>
    </form>
    <p>
     Don't have an account? <Link to="/register">Register here</Link>
    </p>
   </div>
  </>
 );
}

export default Login;
