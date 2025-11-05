import React from 'react'
import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'


function NavBar({ user, setUser}) {

 
  
  return (
    <nav className="navbar level" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample " className="navbar-menu is-spaced">
      {
        user
    ?
    <>
    <div className="navbar-start is-spaced">
    <Link className="level-item is-active " style={{margin: 30,}} to={'/home'}>Home </Link>
    <Link className="level-item is-hoverable" style={{margin: 30}} to={'/profile'}>Profile </Link>
    <Link className="level-item is-hoverable" style={{margin: 30}} to={'/certificates'}>Certificates </Link>
    <Link className="level-item is-hoverable" style={{margin: 30}} to={'/experiences'}>Experiences </Link>
    <Link className="level-item is-hoverable" style={{margin: 30}} to={'/meeting'}>Meetinga </Link>
    </div>
    <div className="navbar-end">
      <div className="level-item">
        <div className="buttons">
          <Link className="button is-light" >
            <LogOutButton setUser={setUser}  />
          </Link>
        </div>
      </div>
    </div>
    </>
    :
    <>
      <div id="navbarBasicExample " className="navbar-menu is-spaced">
        <div className="navbar-start is-spaced">
      <Link className="level-item " style={{margin: 30}} to={'/signup'}>Sign Up</Link>
      <Link className="level-item " style={{margin: 30}} to={'/login'}>Log In</Link>

        </div>
      </div>
    </>
  }

  </div>
</nav>
) 
      
      
  
}

export default NavBar