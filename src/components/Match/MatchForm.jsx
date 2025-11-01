import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function MatchForm({onClose, user, profileInfo}) {
    const modelRef = useRef()
    const navigate = useNavigate()

    const [matchedSkill, setMatchedSkill]= useState([])
       
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }
     async function handleSubmit(e){
        // e.preventDefault()
        console.log(userId);
        try {        
          console.log(skill.role);
          
            response = await axios.post(`http://127.0.0.1:8000/ss/skills/${userId}`, skill)
            console.log(response.data)
            setSkill(response.data)
            setShowModel(false)
          
        } catch (err) {
          if (err.response && err.response.status === 400) {
          alert('Skill alrady exist')
          }
          console.error(err.response)
          console.log(err.response)
            }
        }

    async function getMatchAny(e){
        e.preventDefault()
        try {       
            const response = await axios.get(`http://127.0.0.1:8000/ss/match/${user.user_id}`)
            console.log(response.data)
            setMatchedSkill(response.data)
            onClose
            if ( response.status === 200) {
            navigate(`/match/`, { state: { data: response.data } })
        }
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
        <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
        <div className='innerFormModelContener'>
            <h2>Select the Skills you want to get match with</h2>
            <form onSubmit={handleSubmit}>

                {
                profileInfo.skills_user_learn
                    ?
                    <ul>
                        {
                            profileInfo.skills_user_learn.length
                                ?
                                profileInfo.skills_user_learn.map(skill => {
                                    return (
                                        <li key={skill.id}>
                                            <button className='list_buttons' onClick={() => { desocciateSkill(skill.id) }}>{skill.type} {skill.name}</button>
                                        </li>
                                    )
                                })
                                :
                                <li>No Skill 😢</li>
                            }
                            <button type='button' onClick={getMatchAny}>Any Skill</button>
                    </ul>
                    :
                    <p>Loading</p>
            }
                <button  type='submit'>Save</button>
                <button onClick={onClose}>cancel</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default MatchForm