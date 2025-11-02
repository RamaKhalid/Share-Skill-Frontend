import React from 'react'
import { useRef, useState } from 'react'
import axios from 'axios'


function MeetingForm({user,onClose}) {
     const modelRef = useRef()

    const [meeting, setMeesting]= useState({
        date: '',
        starting_time: '',
        end_time: '',
        is_complete: false,
        users:user.user_id

    })
        async function handleSubmit(e){
        e.preventDefault()

        try {        
            const response = await axios.post(`http://127.0.0.1:8000/ss/meetings/`, meeting)
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
            <h1>Add New Meeting</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date"> Date: </label>
            <input type='date' value={meeting.date} name='date' onChange={handleChange}/>

            <label htmlFor="starting_time">Starting Time: </label>
            <input type='time' value={meeting.starting_time} name='starting_time' onChange={handleChange} />

            <label htmlFor="end_time">End Time: </label>
            <input type='time' value={meeting.end_time} name='end_time' onChange={handleChange} />
            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
        
    </div>
  )
}

export default MeetingForm