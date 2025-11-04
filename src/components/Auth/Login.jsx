
import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate } from "react-router"
import Alert from '@mui/material/Alert';
import AlertMessage from "../Alert/AlertMessage";
import "./LoginSingup.css"



export default function Login({user, setUser }) {
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
    <div className="login_main">
      <div>
        <form className="login_form1" onSubmit={handleSubmit}>
      <h2 className="Login_sign">Login</h2>
          {error?< AlertMessage severity_name="error" message={error}/> : '' }
          {user?'':< AlertMessage severity_name="error" message="You Are Unauthorized, Please Log In First"/>  }
      <input className="login_input " placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
      <input className="login_input " type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
      <input className="login_pass" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      <br />
      <button className="login_submit"  type="submit">Login</button>
    </form>
      </div>
      
    </div>
    
  )
}