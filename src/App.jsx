import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import NavBar from './components/NavBar/NavBar';
import { getUserFromToken } from './lib/auth'
import Profile from './components/Profile/Profile';
import Certificates from './components/Certificates/Certificates';
import ExperiencesList from './components/Experiences/ExperiencesList';
import Meetings from './components/Meetings/Meetings';



function App() {
    const [user, setUser] = useState(getUserFromToken());


  return (
<Router>
      {/* Nav bar takes the user and the set user to show either login or logout buttons */}
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/profile' element={<Profile user={user} />}/>
        <Route path='/certificates' element={<Certificates user={user} />}/>
        <Route path='/experiences' element={<ExperiencesList user={user} />}/>
        <Route path='/meeting' element={<Meetings user={user} />}/>
      </Routes>
    </Router>
  )
}

export default App
