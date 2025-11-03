import React from 'react'
import './Schedule.css'
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {  useState } from 'react'
import MeetingForm from './MeetingForm';
import axios from 'axios'
import DeleteMeeting from './DeleteMeeting';


// sorce code for the table: https://purecode.ai/discover/html/table

function Schedule({user, meetingsList,setMeestingList, userData, onClose}) {
  console.log(meetingsList);
  const [showForm, setShowForm] =useState(false)
  const [showDelete, setShowDelete] =useState(false)
  const [meetingId, setMeetingId] = useState('')
  const [meetings, setMeetings] =useState({
        date: null,
        starting_time: null,
        end_time: null,
        is_complete: false,
        user:user.user_id
  })
  

  function handleClick(e, id) {
      e.preventDefault()
        console.log(id)
        
        const meeting = meetingsList.filter((meeting)=> meeting.id == id)
        setMeetings(meeting)
        console.log(meeting);
        
        if (e.target.name === 'edit' ){
          setMeetingId(id)
          setShowForm(true)

        }
         if (e.target.name === 'addNew' ){
            setShowForm(true)
        }
     }

    //  async function handleSubmit(e) {
    //   e.preventDefault()
    //   console.log(e)
    //     try {        
    //         const response = await axios.put(`http://127.0.0.1:8000/ss/meeting/${meetingId}/`, meetings)
    //         console.log(response.data)
    //         setMeetings(response.data)
    //     } catch (err) {
    //       if (err.response) {
    //             console.error( err.response.data);
    //         } else {
    //             console.error( err.message);
    //         }
    //         }
    //     }
        function handleDelete(e,id) {
          setMeetingId(id)
          setShowDelete(true)
        }
     

      function handleChange(e) {
        console.log(e.target);
        meetingsList.map((meeting,ind)=>{
          if (meeting.id ==e.target.id) {
            setMeestingList({...meetingsList, 
              [ind] : {...meetingsList[ind].id ,[e.target.name]: e.target.value},})
          // setMeetings(meetingsList)
        
          }else{
            setMeestingList({...meetingsList,[e.target.name]: e.target.value,})
          }

        })
        
        
    }
  
  return (
    <div>
<div className="meeting_container">
  <div className="meeting_card">
  <h1 className="meeting_page_title">Your Meetings:</h1>

    <div className="meeting_toolbar">
      {showDelete && <DeleteMeeting  user={user}  meetingId={meetingId} onClose= {()=>setShowDelete(false)}/>}
      {showForm && <MeetingForm  user={user} meetingId={meetingId} meetings ={meetings} setMeestingList={setMeestingList} onClose= {()=>setShowForm(false)}/>}
      <button onClick={handleClick} name='addNew'  className="create-btn">
      {/* <button className="create-btn"> */}
        <FaPlus className="icon" /> Create New Meeting
      </button>
    </div>

    {meetingsList.length ? (
      <div className="meeting_table-wrapper">
        
        <table className="meeting_table">
          <thead>
            <tr>    
              <th>Date</th><th>Starting Time</th><th>Ending Time</th><th>Done</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetingsList.map((meeting) => (
              <tr key={`MET${meeting.id}`}>
                <td><span>{meeting.date} </span></td>
                <td><span>{meeting.starting_time}</span></td>
                <td><span>{meeting.end_time}</span></td>
                <td><span>{meeting.is_complete? 'Done': "Not Done Yet!"} </span></td>
                
                <td>
                  <div className="meeting_actions">
                    <button type='button'className="meeting_edit-btn" name='edit' onClick={(e)=>handleClick(e,meeting.id)} ><FaEdit /></button>
                    <button type='button'name='delete' value={meeting.id} onClick={(e)=>{handleDelete(e, meeting.id)}} className="meeting_delete-btn"><FaTrash /></button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    ):
    (
      <div className="meeting_spinner-container">
        <CgSpinner className="meeting_spinner" />
      </div>
    ) 
    }
  </div>
</div>










    </div>
  )
}

export default Schedule


