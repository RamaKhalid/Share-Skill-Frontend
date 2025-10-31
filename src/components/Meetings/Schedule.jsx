import { useEffect, useState } from 'react'

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'


function Schedule() {
 //   const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from('2025-10-31T09:00[Asia/Riyadh]'),
        end: Temporal.ZonedDateTime.from('2025-10-31T10:00[Asia/Riyadh]'),
        people: ['George'],
        description: 'Vai Zoom',
      },
    ],
    plugins: [
        createEventModalPlugin(),
        createDragAndDropPlugin(),
    ]
  })
 
//   useEffect(() => {
//     // get all events
//     eventsService.getAll()
//   }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Schedule