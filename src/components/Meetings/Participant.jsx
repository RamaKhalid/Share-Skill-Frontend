import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function Participant({user}) {
    const [users, setUSers] = useState([])
    const [profileList, setProfileList] = useState([])
    
    
        
    async function getAllUSer() {
        const response = await authRequest({method:'get', url: 'http://127.0.0.1:8000/ss/home/'})
        console.log(response.data)
        setUSers(response.data.user)
        setProfileList(response.data.profile)
    }
    useEffect(() => {
        getAllUSer()
    }, [])

    function findUsername(params) {
        
    }


  return (
    <div>
        
    </div>
  )
}

export default Participant