
import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate } from "react-router"
import Alert from '@mui/material/Alert';



export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]= useState(null)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/ss/login/", { username, email, password })
      saveTokens(res.data.access, res.data.refresh)
      setUser(getUserFromToken())
      navigate("/profile")
    } catch (err) {
      console.error(err)
      setError(err.response.data.detail)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
          {error?<Alert severity="error">{error}</Alert> : '' }
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      <button type="submit">Login</button>
    </form>
  )
}