import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function MatchForm({onClose, user, profileInfo}) {
    const modelRef = useRef()
    const navigate = useNavigate()

    const [matchedSkill, setMatchedSkill]= useState([])
       
    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }
     async function getMatchbyOneSkill(skill){
        console.log(skill);
        try {       
            const response = await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/match/${user.user_id}/skill/${skill}`})
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

    async function getMatchAny(){
      
        try {       
            const response = await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/match/${user.user_id}`})
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
        <div className='innerFormModelContener' style={{}}>
                {profileInfo.skills_user_learn.length?<h2 className='Login_sign'>Select the Skills you want to get match with</h2>:''}
            <form >

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
                                            <button className='submit_form_btn' style={{background: 'linear-gradient(to right, #e4e3e3ff, #f5e6f8ff)', color:'#9C27B0', width:'100%'}} type='button' onClick={() =>{ getMatchbyOneSkill(skill.id) }}>{skill.type} {skill.name}</button>
                                        </li>
                                    )
                                })
                                :
                                <li  >You Didn't Register Your Skills Please Go To Your Profile And Update Your Data So You Can Enjoy Our Service! </li>
                            }
                            {profileInfo.skills_user_learn.length?<button className='submit_form_btn' style={{width:'100%'}}  type='button' onClick={getMatchAny}>Any Skill</button>:""}
                    </ul>
                    :
                    <p>Loading...</p>
            }
            </form>
        </div>
    </div>
    </div>
  )
}

export default MatchForm