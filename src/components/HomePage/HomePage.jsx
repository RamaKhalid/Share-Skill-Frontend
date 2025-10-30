import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './homeStyle.scss';



function HomePage() {
    const [users, setUSers] = useState([])
    const [profileList, setProfileList] = useState([])


     async function getAllUSer() {
        const response = await axios.get('http://127.0.0.1:8000/ss/home/')
        console.log(response.data)
        setUSers(response.data.user)
        setProfileList(response.data.profile)
    }
    useEffect(() => {
        getAllUSer()
    }, [])

    function getSkills(userID){
       const userProfile = profileList.find(profile=> profile.user === userID)
        if (userProfile)
        return userProfile.level
    }

  return (
    <div>
        <h1>Users:</h1>

        <div className="container">
        {
            users.length
                ?
                users.map((user) => {
                    return (
                        <div className="card">
                        <div className="content">
                            <div className="img"><img src="https://unsplash.it/200/200"/></div>
                            <div className="cardContent">
                            <h3>{user.first_name} - {user.last_name}<br/>
                            <span>level: {getSkills(user.id)}  </span></h3>
                            {/* <span>level: {profileList.find(profile=> profile.user === user.id).level}</span></h3> */}
                            </div>
                        </div>
                        <ul className="sci">
                            <li style={{"--i":1}}>
                            <a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                </div>
                    )
                })
                :
                <h2>No Users</h2>
            }
            
        </div>







  

    </div>
  )
}

export default HomePage





