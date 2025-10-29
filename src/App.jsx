import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
<Router>
      {/* Nav bar takes the user and the set user to show either login or logout buttons */}
      {/* <NavBar user={user} setUser={setUser}/> */}
      <Routes>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </Router>
  )
}

export default App
