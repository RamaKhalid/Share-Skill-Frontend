import React from 'react'
import './Schedule.css'
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {  useState } from 'react'
import MeetingForm from './MeetingForm';

// sorce code for the table: https://purecode.ai/discover/html/table

function Schedule({user, meetingsList, userData, onClose}) {
  console.log(meetingsList);
  const [showForm, setShowForm] =useState(false)
  const [meetings, setMeetings] =useState(false)

  function handleClick(e) {
        e.preventDefault()
            setShowForm(true)
     }

     async function handleSubmit() {
      e.preventDefault()

        try {        
            const response = await axios.post(`http://127.0.0.1:8000/ss/meetings/${user.user_id}`, meeting)
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
      
     

      function handleChange(e) {
        setMeetings({...meetings, [e.target.name]: e.target.value})
    }
  
  return (
    <div>
<div className="meeting_container">
  <div className="meeting_card">
  <h1 className="meeting_page_title">Your Meetings:</h1>

    <div className="meeting_toolbar">
      {showForm && <MeetingForm  user={user} userData={userData} onClose= {()=>setShowForm(false)}/>}
      <button onClick={handleClick} className="create-btn">
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
              <tr key={meeting.id}>
                <td><span><input name='date' value={meeting.date} onChange={handleChange}/></span></td>
                <td><span><input name='starting_time' value={meeting.starting_time} onChange={handleChange}/></span></td>
                <td><span><input name='end_time' value={meeting.end_time} onChange={handleChange}/></span></td>
                <td><span><input name='is_complete' value={meeting.is_complete? 'Done': "Not Done Yet!"} onChange={handleChange}/></span></td>
                <td>
                  <div className="meeting_actions">
                    <button type='submit' className="meeting_edit-btn" ><FaEdit /></button>
                    <button className="meeting_delete-btn"><FaTrash /></button>
                    <button className="meeting_view-btn"><FaEye /></button>
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
