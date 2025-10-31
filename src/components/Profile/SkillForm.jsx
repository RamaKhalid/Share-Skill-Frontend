// import { useState, useRef } from 'react'
// import axios from 'axios'


// function SkillForm({onClose}) {
//     const [skill, setSkill]= useState({
//         type: '',
//         name: ''
//     })

//     const modelRef = useRef()

//     async function handleSubmit(e){
//         try {        
//             response = await axios.post(`http://127.0.0.1:8000/ss/skills/`, skill)
//             console.log(response.data)
//             setSkill(response.data)
//             setShowModel(false)
//         } catch (err) {
//           console.error(err)
//           console.log(err.response.data)
//             }
//         }
        

//     const closeModel= (e)=> {
//       if (modelRef.current == e.target){
//         onClose();
//       }
//     }

//     function handleChange(e) {
//         setSkill({...skill, [e.target.name]: e.target.value})
//     }
    
//   return (
//     <div>
//         <div ref={modelRef} className='FormModelContener' onClick={closeModel}>
//         <div className='innerFormModelContener'>
//             <h1>Add New Skill</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="type"> Type: </label>
//             <input value={skill.type} name='type' onChange={handleChange}/>

//             <label htmlFor="name">Name: </label>
//             <input value={skill.name} name='name' onChange={handleChange} />
            
//                 <button  type='submit'>Save</button>
//                 <button onClick={onClose}>cancel</button>
//             </form>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default SkillForm