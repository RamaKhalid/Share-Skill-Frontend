// src/SignUp.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birth_date, setBirthDate] = useState('')
  const [level, setLevel] = useState('')
  const [phone, setPhone] = useState('')
 

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/ss/signup/', { username, first_name, last_name, password, email, birth_date, level, phone })
      navigate('/login')
    } catch (err) {
      console.error(err)
    //    add error handhling
      alert('Signup failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder='First Name' value={first_name} onChange={e => setFirstName(e.target.value)} />
      <input placeholder='Last Name' value={last_name} onChange={e => setLastName(e.target.value)} />
      <input type='date' value={birth_date} onChange={e => setBirthDate(e.target.value)} />
      <select value={level} onChange={e => setLevel(e.target.value)} >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
      <input type='phone' placeholder='phone' value={phone} onChange={e => setPhone(e.target.value)} />
      <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button type='submit'>Sign Up</button>
    </form>
  )
}