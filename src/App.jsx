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
import MatchedPage from './components/Match/MatchedPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';



function App() {
    const [user, setUser] = useState(getUserFromToken());
    
    
    

  return (
<Router>
      {/* Nav bar takes the user and the set user to show either login or logout buttons */}
      {/* <NavBar user={user} setUser={setUser} setSkillId= {setSkillId} setSearchData={ setSearchData}/> */}
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/login' element={ <Login user={user} setUser={setUser}/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/home' element={ <ProtectedRoute><HomePage user={user}  /> </ProtectedRoute> }/>
        <Route path='/profile' element={<ProtectedRoute><Profile user={user} /> </ProtectedRoute> }/>
        <Route path='/certificates' element={<ProtectedRoute><Certificates user={user} /></ProtectedRoute>}/>
        <Route path='/experiences' element={<ProtectedRoute><ExperiencesList user={user} /></ProtectedRoute>}/>
        <Route path='/meeting' element={<ProtectedRoute><Meetings user={user} /></ProtectedRoute>}/>
        <Route path='/match' element={<ProtectedRoute><MatchedPage user={user} /></ProtectedRoute>}/>
        
      </Routes>
    </Router>
  )
}

export default App
