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
  const [birth_date, setBirthDate] = useState('')
  const [level, setLevel] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError]= useState(null)
  const [pass, setPass]= useState(false)
 

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (pass){
        const response= await axios.post('http://127.0.0.1:8000/ss/signup/', { username, first_name, last_name, password, email, birth_date, level, phone })
        navigate('/login')
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
            alert('pass');
            setPass(true);
            setError('')
         }else{
          setError('Password Must Be At Least 8 characters long at least one uppercase letter at least one lowercase letter at least one digit at least one special character')
         }        
    }

  return (
    <>
    {error?<Alert severity="error">{error}</Alert> : '' }
    <form onSubmit={handleSubmit}>
      
      <h2>Sign Up</h2>
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required/>
      <input placeholder='First Name' value={first_name} onChange={e => setFirstName(e.target.value)} required/>
      <input placeholder='Last Name' value={last_name} onChange={e => setLastName(e.target.value)} required />
      {/* <input type='date' value={birth_date} onChange={e => setBirthDate(e.target.value)} required/> */}
      {/* <select value={level} onChange={e => setLevel(e.target.value)} > */}
        {/* <option value="Beginner">Beginner</option> */}
        {/* <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select> */}
      {/* <input type='text' pattern="[0][5][0-9]{8}" placeholder='phone: 05XXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} required/> */}
      <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
      <input type='password' placeholder='Password' value={password} onChange={(e)=>{handleChange(e)}}required />
      <button type='submit'>Sign Up</button>
    </form>
    </>
  )
}