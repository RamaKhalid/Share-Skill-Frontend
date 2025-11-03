import { useEffect, useState } from 'react'
import axios from 'axios'

import Schedule from './Schedule'
import MeetingForm from './MeetingForm'


function Meetings({user}) {
const [showForm, setShowForm] =useState(false)
    const [meetingsList, setMeestingList]= useState({
        date: '',
        starting_time: '',
        end_time: '',
        is_complete: false,
    })
    const [userData, setuserData]= useState({
        id: '',
        email: '',
        first_name: '',
        last_name: '',
    })

    async function gettMeeting() {
         try {        
            const response = await axios.get(`http://127.0.0.1:8000/ss/meetings/${user.user_id}`)
            console.log(response.data)
            setMeestingList(response.data.meeting)
            setuserData(response.data.user_data)
        } catch (err) {
          if (err.response) {
                console.error( err.response.data);
            } else {
                console.error( err.message);
            }
            }
        }

    useEffect(() => {
    gettMeeting ()
  }, [])
    

    function handleClick(e) {
        e.preventDefault()
            setShowForm(true)
     }
      

  return (
    <div>
        {showForm && <MeetingForm  user={user} userData={userData} onClose= {()=>setShowForm(false)}/>}
        <button onClick={handleClick} >Add meeting</button>
        <Schedule user= {user} meetingsList= {meetingsList} userData={userData} onClose= {()=>setShowForm(false)}/>
    </div>
  )
}

export default Meetings