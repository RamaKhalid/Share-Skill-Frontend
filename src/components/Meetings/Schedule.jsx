import React from 'react'
import './Schedule.css'
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {  useState } from 'react'
import MeetingForm from './MeetingForm';
import Checkbox from '@mui/material/Checkbox';
import DeleteMeeting from './DeleteMeeting';
import AlertMessage from '../Alert/AlertMessage';
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
import "./schedule.css"


// sorce code for the table: https://purecode.ai/discover/html/table

function Schedule({user, meetingsList,setMeestingList,participantData, userData, onClose}) {
  console.log(meetingsList);
  console.log(participantData);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [showForm, setShowForm] =useState(false)
  const [showDelete, setShowDelete] =useState(false)
  const [meetingId, setMeetingId] = useState('')
  const [meetings, setMeetings] =useState({
        date: null,
        starting_time: null,
        end_time: null,
        is_complete: false,
        participant:'',
        user:user.user_id
  })
  
  
  const [success, setSuccess] = useState(null)
  
  
  

  function handleClick(e, id) {
      e.preventDefault()
        console.log(id)
        
        const meeting = meetingsList.filter((meeting)=> meeting.id == id)
        if(meeting.length){
          setMeetings(meeting)

        }
        console.log(meeting);
        
        if (e.target.name === 'edit' ){
          setMeetingId(id)
          setShowForm(true)

        }
         if (e.target.name === 'addNew' ){
          console.log(meetings);
          
            setShowForm(true)

        }
     }


        function handleDelete(e,id) {
          setMeetingId(id)
          setShowDelete(true)
        }


  async function handleChecked (event) {
        event.preventDefault()

    console.log(event.target.id);
   const Meeting = meetingsList.filter((met)=> met.id == event.target.id)
   Meeting[0].is_complete=true
   console.log(Meeting);
   
            try {        
                const response = await authRequest(
                                {data: Meeting[0],
                                 method:'put',
                                 url:`http://127.0.0.1:8000/ss/meeting/${event.target.id}/`})
                if (response){
                  setSuccess('Your Meeting is Updated Successfully! ')
                }
                console.log(response.data)
            setMeetings(response.data)
            
              
        } catch (err) {
          if (err.response) {
                console.error( err.response.data);
            } else {
                console.error( err.message);
            }
            }
        

  }

  
  return (
    <div>
<div className="meeting_container">
  <div className="meeting_card">
  {success? <AlertMessage severity_name="success" message={success}/> : '' }
  <h1 style={{ color: '#58005E',justifyContent:'center', display:'flex', fontSize: 45, fontFamily: 'Inria Serif', fontWeight: '400'}}>Your Meetings:</h1>

    <div className="meeting_toolbar">
      {showDelete && <DeleteMeeting  user={user}  meetingId={meetingId} onClose= {()=>setShowDelete(false)}/>}
      {showForm && <MeetingForm  user={user} setSuccess={setSuccess} meetingId={meetingId} meetings ={meetings} meetingsList={meetingsList} setMeestingList={setMeestingList} onClose= {()=>setShowForm(false)}/>}
      <button  onClick={handleClick} name='addNew'  className="meeting_create-btn">
        <FaPlus className="icon" style={{ fill: 'white' }}  /> Create New Meeting
      </button>
    </div>

    {meetingsList.length ? (
      <div className="meeting_table-wrapper">
        
        <table className="meeting_table">
          <thead>
            <tr>    
              <th>Date</th><th>Starting Time</th><th>Ending Time</th><th>With</th><th>Done</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetingsList.map((meeting,idx) => (
              !meeting.is_complete&&<tr key={`MET${meeting.id}`}>
                <td><span>{meeting.date} </span></td>
                <td><span>{meeting.starting_time}</span></td>
                <td><span>{meeting.end_time}</span></td>
                <td><span>{meeting.participant}</span></td>
                <td><span><Checkbox
                            checked={meeting.is_complete?true: false }
                            onChange={handleChecked}
                            name="is_complete" 
                            id={meeting.id}
                            slotProps={{
                              input: { 'aria-label': 'controlled' },
                            }}
                          /> </span></td>                
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
        <h2 style={{color:"#8C55AA"}}>
        You Don't Have Any Meeting Yet
          
        </h2>
      </div>
    ) 
  }
  </div>
    <br/>
    <br/>
  <div className="meeting_card">
  {/* {success? <AlertMessage severity_name="success" message={success}/> : '' } */}
  <h1 style={{ color: '#58005E',justifyContent:'center', display:'flex', fontSize: 45, fontFamily: 'Inria Serif', fontWeight: '400'}}>Your Finshed Meetings:</h1>

    {meetingsList.length ? (
      <div className="meeting_table-wrapper">
        
        <table className="meeting_table">
          <thead>
            <tr>    
              <th>Date</th><th>Starting Time</th><th>Ending Time</th><th>With</th><th>Done</th><th>Actions</th>
            </tr>
          </thead>
          <tbody className='Done_Tabel'>
            {meetingsList.map((meeting,idx) => (
              meeting.is_complete&&<tr key={`MET${meeting.id}`}>
                <td><span style={{ color: '#6b6868' }}>{meeting.date} </span></td>
                <td><span style={{ color: '#6b6868' }}>{meeting.starting_time}</span></td>
                <td><span style={{ color: '#6b6868' }}>{meeting.end_time}</span></td>
                <td><span style={{ color: '#6b6868' }}>{meeting.participant}</span></td>
                <td><span  ><Checkbox
  checked
  disabled
  sx={{
    color: '#6b6868',
    '&.Mui-checked': {
      color: '#6b6868',
    },
    '&.Mui-disabled': {
      color: '#6b6868',
    },
  }}
/></span></td>                
                <td>
                  <div className="meeting_actions">
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
      <div className="meeting_spinner-container" >
        <h2 style={{color:"#8C55AA"}}> 
          You Don't Have Any Meeting Yet!
          
        </h2>
      </div>
    ) 
    }
    
  </div>
  </div>
</div>
  )
}

export default Schedule


