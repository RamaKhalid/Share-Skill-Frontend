import React from 'react'
import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


import './homeStyle.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import Match from '../Match/Match';



function HomePage({user}) {
    
    const [users, setUSers] = useState([])
    const [profileList, setProfileList] = useState([])
    const [show, setSow]= useState(true)
    const[skillID, setSkillId] = useState('')


    
    async function getAllUSer() {
        const response = await authRequest({method:'get', url: 'http://127.0.0.1:8000/ss/home/'})
        console.log(response.data)
        setUSers(response.data.user)
        setProfileList(response.data.profile)
    }
    
    useEffect(() => {
        getAllUSer()
    }, [])

    function getLevels(userID){
       const userProfile = profileList.find(profile=> profile.user === userID)
        if (userProfile)
        return userProfile.level
    }

    function getUserBySkill(sID){
        // console.log(profileList);
        
       const userProfile = profileList.filter((profile)=> {
        return profile.skills.some((skill)=> skill === sID) })
        console.log(userProfile);
        
        const userSkill = users.filter((user)=> userProfile.some((profile) => profile.user === user.id))
        if (userSkill){
        //    console.log(userSkill);
            setUSers(userSkill)
            setSow(false)  
        }
    }

  return (
    <div>
        <SearchBar setSkillId={setSkillId} onTrigger={getUserBySkill} user={user} />
        <Match user= {user} />
        <h1>Users:</h1>

        <div className="container">
        {
            // (searchData=== undefined || searchData === null || searchData === '')
            users.length  
                ?
                users.map((user) => {
                    return (
                        <div className="card" key={user.id}>
                        <div className="content">
                            <div className="img"><img src="https://unsplash.it/200/200"/></div>
                            <div className="cardContent">
                            <h3>{user.first_name} - {user.last_name}<br/>
                            <span>level: {getLevels(user.id)}  </span></h3>
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





