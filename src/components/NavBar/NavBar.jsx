import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {

 
  
  return (
    <nav>
      {
        user
          ?
          <LogOutButton setUser={setUser}  />
          :
          <>
            <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Log In</Link>
          </>
      }
      <Link to={'/home'}>Home </Link>
      <Link to={'/profile'}>Profile </Link>
      <Link to={'/certificates'}>Certificates </Link>
      <Link to={'/experiences'}>Experiences </Link>
      <Link to={'/meeting'}>Meetinga </Link>
    </nav>
  )
}

export default NavBar