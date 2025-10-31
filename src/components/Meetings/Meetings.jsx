import React from 'react'
import { useEffect, useState } from 'react'


function Meetings() {
    const [meeting, setMeesting]= useState()
        async function handleSubmit(e){
        try {        
            response = await axios.post(`http://127.0.0.1:8000/ss/meetings/`, skill)
            console.log(response.data)
            setSkill(response.data)
            setShowModel(false)
        } catch (err) {
          console.error(err)
          console.log(err.response.data)
            }
        }
  return (

    <div>
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h1>Add New Meeting</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date"> Type: </label>
            <input value={skill.date} name='date' onChange={handleChange}/>

            <label htmlFor="time">Name: </label>
            <input value={skill.time} name='time' onChange={handleChange} />

            <label htmlFor="time">Name: </label>
            <input value={skill.time} name='time' onChange={handleChange} />
            
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
        
    </div>
  )
}

export default Meetings