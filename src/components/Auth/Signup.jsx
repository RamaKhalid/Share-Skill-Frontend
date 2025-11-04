// src/SignUp.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Alert from '@mui/material/Alert';

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]= useState(null)
  const [pass, setPass]= useState(false)
 

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (pass){
        const response= await axios.post('http://127.0.0.1:8000/ss/signup/', { username, first_name, last_name, password, email})
        navigate('/login/')
      }
     
      
    } catch (err) {
      console.error(err)
      
      if (err.status=== 400)
      {
        console.log(err.response.data.error);
        setError(err.response.data.error)
      }
    }
    
  }
  // source: https://stackoverflow.com/questions/42060640/password-validation-in-reactjs
     function handleChange(e) {
        setPassword(e.target.value)
         let pass = e.target.value;
         let reg = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
         let test = reg.test(pass);
         if (test) {
            // alert('pass');
            setPass(true);
            setError('')
         }else{
          setError('Password Must Be \n-At Least 8 characters long \n-at least one uppercase letter \n-at least one lowercase letter \n-at least one digit at least one special character')
         }        
    }

  return (
    <div className="login_main">
      <div>
        {error?<Alert severity="error">{error}</Alert> : '' }
    <form onSubmit={handleSubmit}>
      
      <h2 className="Login_sign">Sign Up</h2>
      <input className="login_input "  placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required/>
      <input className="login_input "  placeholder='First Name' value={first_name} onChange={e => setFirstName(e.target.value)} required/>
      <input className="login_input "  placeholder='Last Name' value={last_name} onChange={e => setLastName(e.target.value)} required />
      <input className="login_input "  type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
      <input className="login_pass "  type='password' placeholder='Password' value={password} onChange={(e)=>{handleChange(e)}}required />
      <br />
      <button className="login_submit"  type='submit'>Sign Up</button>
    </form>
      </div>
    
    </div>
  )
}