import React from 'react'
import { useEffect, useState , useRef} from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


import './homeStyle.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import Match from '../Match/Match';
import UserDetail from './UserDetail';



function HomePage({user}) {
    
    const [users, setUSers] = useState([])
    const [profileList, setProfileList] = useState([])
    const[skillID, setSkillId] = useState('')
    const [showForm, setShowForm] =useState(false)
    const [userID, setUserID]=useState(null)
    
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

        
       const userProfile = profileList.filter((profile)=> {
        return profile.skills.some((skill)=> skill === sID) })
        console.log(userProfile);
        
        const userSkill = users.filter((user)=> userProfile.some((profile) => profile.user === user.id))
        if (userSkill){
            setUSers(userSkill)
             
        }
    }

    const handleProfileClick=(e)=>{
        setUserID(e.target.id);
        setShowForm(true)
    }

  return (
    <div>
        <SearchBar setSkillId={setSkillId} onTrigger={getUserBySkill} user={user} />
        {/* source : https://www.figma.com/design/rQJgid3Sl19qSmpLZqxw2i/Free-Figma-Website-Landing-Pages---Startup-App--Community-?node-id=970-923&t=Xdwgq5peOEk9Cp82-0 */}
    <div style={{width: 842, height: 547, position: 'relative' ,marginLeft:300}}>
  <div style={{width: 166.02, height: 174.64, left: 237.37, top: 186.18, position: 'absolute', background: '#FF0D6A', boxShadow: '150px 150px 150px ', borderRadius: 9999, filter: 'blur(75px)'}} />
  <div style={{width: 166.02, height: 174.64, left: 343.02, top: 186.18, position: 'absolute', background: '#8886F1', boxShadow: '150px 150px 150px ', borderRadius: 9999, filter: 'blur(75px)'}} />
  <div style={{width: 166.02, height: 174.64, left: 448.67, top: 186.18, position: 'absolute', background: '#EA00FF', boxShadow: '150px 150px 150px ', borderRadius: 9999, filter: 'blur(75px)'}} />
  <div style={{width: 296, height: 50, left: 393, top: 344, position: 'absolute', color: '#58005E', fontSize: 32, fontFamily: 'Inria Serif', fontWeight: '400', wordWrap: 'break-word'}}>learn what you love</div>
  <div style={{width: 396, left: 254, top: 304, position: 'absolute', color: '#58005E', fontSize: 32, fontFamily: 'Inria Serif', fontWeight: '400', wordWrap: 'break-word'}}>Share what you know </div>
  <div style={{width: 446, height: 179, left: 225, top: 184, position: 'absolute', color: '#58005E', fontSize: 96, fontFamily: 'Inria Serif', fontWeight: '400', wordWrap: 'break-word'}}>SwapSkill</div>
</div>
        
        <Match user= {user} />

            <h1 style={{ marginTop: 200,color: '#58005E',justifyContent:'center', display:'flex', fontSize: 70, fontFamily: 'Inria Serif', fontWeight: '400'}}>Users:</h1>
        <div className="hopmepage_container">
            {showForm && < UserDetail userID={userID} users={users} profileList={profileList} onClose= {()=>setShowForm(false)}  />}
        {
            users.length  
            ?
            users.map((user) => {
                    return (
                        <div  className="card" key={user.id} id={user.id} onClick={(e)=>{handleProfileClick(e)}}>
                        <div className="content">
                            <div className="img"><img src="https://unsplash.it/200/200"/></div>
                            <div className="cardContent">
                            <h3>{user.first_name} - {user.last_name}<br/>
                            <span>level: {getLevels(user.id)}  </span></h3>
                            </div>
                        </div>
                        <ul className="sci">
                            <li style={{"--i":1}}>
                            <a href={`mailto:${user.email}`}><i className="fa fa-envelope" aria-hidden="true"></i></a>
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





