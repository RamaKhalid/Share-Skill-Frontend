import React from 'react'
import { useRef, useState } from 'react'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import AlertMessage from '../Alert/AlertMessage'



function MeetingForm({user,meetings, meetingId, setMeestingList, setSuccess ,onClose}) {
     const modelRef = useRef()
     console.log(meetings)
     

    const [meeting, setMeesting]= useState({
        date: meetings.length? meetings[0].date : '',
        starting_time:  meetings.length? meetings[0].starting_time : '',
        end_time:  meetings.length? meetings[0].end_time : '',
        is_complete:meetings.length? meetings[0].is_complete : false,
        participant_username:meetings.length? meetings[0].participant: '',
        user:user.user_id,

    })
    const [errors, setErrors] = useState(null)
    async function handleSubmit(e){
        e.preventDefault()
        if (meeting.starting_time) {
              if (meeting.end_time< meeting.starting_time) {
                setErrors('Starting Time Must Be Befor The End Time')
                return
              }}

        let response= {}
        try {        
          if(meetingId){
            response = await authRequest(
                            {data: meeting,
                             method:'put',
                             url:`http://127.0.0.1:8000/ss/meeting/${meetingId}/`})
            if (response){
              setSuccess('Your Meeting is Updated Successfully! ')
              // setExperiencesList( response.data)
            }
          }
          else{
            response = await authRequest(
                            {data: meeting,
                             method:'post',
                             url:`http://127.0.0.1:8000/ss/meetings/${user.user_id}/`})
            if (response){
              setSuccess('Your Meeting is Added Successfully! ')
              setMeestingList( response.data.meeting)
            }
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
          let time1 = meeting.starting_time;
          let time2 = meeting.end_time;

          let start = time1.split(":");
          let end = time2.split(":");

          if (start[0] < end[0]) {
                setErrors('Starting Time Must Be Befor The End Time')
          } else {
              // Hours are equal, compare minutes
               if (start[1] < end[1]) {
                setErrors('Starting Time Must Be Befor The End Time')
          }}

          console.log(e);
          // if(e.target.name === 'end_time'){
          //   console.log(typeof meeting.starting_time);
          //   if (meeting.starting_time) {
          //     if (meeting.end_time< meeting.starting_time) {
          //       setErrors('Starting Time Must Be Befor The End Time')
          //     }
          //   }
            
          // }
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
            {errors ?< AlertMessage severity_name="error" message={errors}/>:'' }
            <h1>{meetings.length? 'Edit your meeting':'Add New Meeting'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date"> Date: </label>
            <input type='date' value={meeting.date} name='date' onChange={handleChange}required/>

            <label htmlFor="starting_time">Starting Time: </label>
            <input type='time' value={meeting.starting_time} name='starting_time' onChange={handleChange}required />

            <label htmlFor="end_time">End Time: </label>
            <input type='time' value={meeting.end_time} name='end_time' onChange={handleChange}required />

            <label htmlFor="participant_username">participant: </label>
            <input type='text' value={meeting.participant_username} name='participant_username' onChange={handleChange}required />

            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
        
    </div>
  )
}

export default MeetingForm