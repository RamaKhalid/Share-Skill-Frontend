import React from 'react'
import { useRef, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"



function MeetingForm({user,meetings, meetingId ,onClose}) {
     const modelRef = useRef()
     console.log(meetings);
     

    const [meeting, setMeesting]= useState({
        date: meetings? meetings[0].date : '',
        starting_time:  meetings? meetings[0].starting_time : '',
        end_time:  meetings? meetings[0].end_time : '',
        is_complete:meetings? meetings[0].is_complete : '',
        user:user.user_id

    })
        async function handleSubmit(e){
        e.preventDefault()

        let response= {}
        try {        
          if(meetingId){
            response = await authRequest(
                            {data: meeting,
                             method:'put',
                             url:`http://127.0.0.1:8000/ss/meeting/${meetingId}/`})
          }
          else{
            response = await authRequest(
                            {data: meeting,
                             method:'put',
                             url:`http://127.0.0.1:8000/ss/meetings/${user.user_id}`})

          }
            console.log(response.data)
            setMeesting(response.data)
            onClose()
        } catch (err) {
          if (err.response) {
                console.error( err.response.data);
            } else {
                console.error( err.message);
            }
            }
        }

        function handleChange(e) {
        setMeesting({...meeting, [e.target.name]: e.target.value})
    }

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }
  return (

    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>{meetings? 'Edit your meeting':'Add New Meeting'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date"> Date: </label>
            <input type='date' value={meeting.date} name='date' onChange={handleChange}required/>

            <label htmlFor="starting_time">Starting Time: </label>
            <input type='time' value={meeting.starting_time} name='starting_time' onChange={handleChange}required />

            <label htmlFor="end_time">End Time: </label>
            <input type='time' value={meeting.end_time} name='end_time' onChange={handleChange}required />
            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
        
    </div>
  )
}

export default MeetingForm