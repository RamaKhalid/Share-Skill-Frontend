import React from 'react'
import './Schedule.scss'


function Schedule({meetingsList}) {
  return (
    <div>
      

        <section class="wrapper">
   
    <main class="row title">
      <ul>
        <li>Date</li>
        <li>Starting Time</li>
        <li>Ending Time</li>
        <li>With</li>
        <li>Done</li>
      </ul>
    </main>
    <section class="row-fadeIn-wrapper">
      <article class="row fadeIn nfl">
          {meetingsList.length
          ?
          meetingsList.map(meeting=>{
            return(
              <ul>
              <li>{meeting.date}</li>
              <li>{meeting.starting_time}</li>
              <li>{meeting.end_time}</li>
              <li>{meeting.is_complete? 'Done': "Not Done Yet!"}</li>
              </ul>
            )
          })
          :
          <h1>No Meetings</h1>
          }
        <ul class="more-content">
          <li>This 1665-player contest boasts a $300,000.00 prize pool and pays out the top 300 finishing positions. First place wins $100,000.00. Good luck!</li>
        </ul>
      </article>
    </section>
    </section>
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
