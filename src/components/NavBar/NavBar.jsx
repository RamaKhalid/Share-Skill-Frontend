import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'
import { SearchBar } from '../SearchBar/SearchBar'
import { useState } from 'react'


function NavBar({ user, setUser , setSkillId, setSearchData}) {
    // const[skillID, setSkillId] = useState('')

 
  
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
      {/* <SearchBar setSkillId={setSkillId} setSearchData= {setSearchData} /> */}
      <Link to={'/home'}>Home </Link>
      <Link to={'/profile'}>Profile </Link>
      <Link to={'/certificates'}>Certificates </Link>
      <Link to={'/experiences'}>Experiences </Link>
      <Link to={'/meeting'}>Meetinga </Link>
    </nav>
  )
}

export default NavBar