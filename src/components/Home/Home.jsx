import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'



function Home() {
    const [users, setUSers] = useState([])
    const [profiles, setProfiles] = useState([])

     async function getAllUSer() {
        const response = await axios.get('http://127.0.0.1:8000/ss/home/')
        console.log(response.data)
        setUSers(response.data.user)
        setProfiles(response.data.profile)
    }
    useEffect(() => {
        getAllUSer()
    }, [])
  return (
    <div>
        <h1>Users:</h1>
        {
        users.length
            ?
            users.map((user) => {
                return (
                    <div>
                        <p>{user.username}</p>
                        <p>{user.username}</p>
                    </div>
                )
            })
            :
            <h2>No Cats</h2>
        }

    </div>
  )
}

export default Home