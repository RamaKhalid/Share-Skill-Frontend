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
  

  function handleClick(e) {
      e.preventDefault()
            setShowForm(true)
     }

     async function handleSubmit(e) {
      e.preventDefault()
      console.log(e)
        try {        
            const response = await axios.put(`http://127.0.0.1:8000/ss/meeting/${meetingId}/`, meetings)
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
        function handleDelete(e,id) {
          setMeetingId(id)
          setShowDelete(true)
        }

        // async function handleDelete(e, id ) {
          
        //     try {        
        //     const response = await axios.delete(`http://127.0.0.1:8000/ss/meeting/${id}/`)
        //     window.location.reload();
        // } catch (err) {
        //   if (err.response) {
        //         console.error( err.response.data);
        //     } else {
        //         console.error( err.message);
        //     }
        //     }
        // }
        
      
     

      function handleChange(e) {
        console.log(Object.keys(meetingsList));
          setMeestingList({...meetingsList, [e.target.name]: e.target.value})
        
        setMeetingId(e.target.id)
        // setMeetings(meetingsList)
        
        
    }
  
  return (
    <div>
<div className="meeting_container">
  <div className="meeting_card">
  <h1 className="meeting_page_title">Your Meetings:</h1>

    <div className="meeting_toolbar">
      {showDelete && <DeleteMeeting  user={user}  meetingId={meetingId} onClose= {()=>setShowDelete(false)}/>}
      {showForm && <MeetingForm  user={user} userData={userData} onClose= {()=>setShowForm(false)}/>}
      <button onClick={handleClick}  className="create-btn">
      {/* <button className="create-btn"> */}
        <FaPlus className="icon" /> Create New Meeting
      </button>
    </div>

    {meetingsList.length ? (
      <div className="meeting_table-wrapper">
        <form  onSubmit={handleSubmit}>
        <table className="meeting_table">
          <thead>
            <tr>    
              <th>Date</th><th>Starting Time</th><th>Ending Time</th><th>Done</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetingsList.map((meeting) => (
              <tr key={`MET${meeting.id}`}>
                <td><span><input type='date' id={meeting.id} name='date' value={meeting.date} onChange={handleChange} required/></span></td>
                <td><span><input type='time' id={meeting.id} name='starting_time' value={meeting.starting_time} onChange={handleChange} required/></span></td>
                <td><span><input type='time'id={meeting.id} name='end_time' value={meeting.end_time} onChange={handleChange} required/></span></td>
                <td><span><input name='is_complete' id={meeting.id} value={meeting.is_complete? 'Done': "Not Done Yet!"} onChange={handleChange}/></span></td>
                
                <td>
                  <div className="meeting_actions">
                    <button type='submit'className="meeting_edit-btn" ><FaEdit /></button>
                    <button type='button'name='delete' value={meeting.id} onClick={(e)=>{handleDelete(e, meeting.id)}} className="meeting_delete-btn"><FaTrash /></button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
            </form>
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
































// import { useEffect, useState } from 'react'

// import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
// import {
//   createViewDay,
//   createViewMonthAgenda,
//   createViewMonthGrid,
//   createViewWeek,
// } from '@schedule-x/calendar'
// import { createEventsServicePlugin } from '@schedule-x/events-service'
// import 'temporal-polyfill/global'
// import '@schedule-x/theme-default/dist/index.css'
// import { createEventModalPlugin } from '@schedule-x/event-modal'
// import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
// import MeetingForm from './MeetingForm'


// function Schedule({meetingsList}) {
//   console.log(meetingsList);
//   let scheduleMeeting =[]
  
// const eventsService = useState(() => createEventsServicePlugin())[0]

// if(meetingsList && meetingsList[0]) 
// {
//   scheduleMeeting = meetingsList.map(meeting =>{
//   return{
//         id: meeting.id,
//         title: 'Event 1',
//         start: Temporal.ZonedDateTime.from(`${meeting.date}T${meeting.starting_time}[Asia/Riyadh]`),
//         end: Temporal.ZonedDateTime.from(`${meeting.date}T${meeting.end_time}[Asia/Riyadh]`),
//         people: ['Ram'],
//         description: 'Vai Zoom',
//   } } )
//  console.log(scheduleMeeting);
// }
 
//   const calendar = useCalendarApp({
//     views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
//     events: [
//       {
//         id: '1',
//         title: 'Event 1',
//         start: Temporal.ZonedDateTime.from('2025-10-31T09:00[Asia/Riyadh]'),
//         end: Temporal.ZonedDateTime.from('2025-10-31T10:00[Asia/Riyadh]'),
//         people: ['George'],
//         description: 'Vai Zoom',
//       },
//     ],
//     plugins: [
//       eventsService,
//         createEventModalPlugin(),
//         createDragAndDropPlugin(),
//     ]
//   })
 
//   useEffect(() => {
//     // get all events
//     eventsService.getAll()
//   }, [])

// function handleClick(e) {
//         e.preventDefault()
//         setShowForm(true)
//       }
      
      
 
//   return (
//     <div>
      
//       <ScheduleXCalendar calendarApp={calendar} />
//     </div>
//   )
// }

// export default Schedule
