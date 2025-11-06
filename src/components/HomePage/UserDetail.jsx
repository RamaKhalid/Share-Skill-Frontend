import { useEffect ,useState, useRef } from 'react'

function UserDetail({userID, users, profileList, onClose}) {

    const modelRef = useRef()
    const [userInfo, setUserInfo] = useState({
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            experiences:'',
            certificates: ''
                })

     const [profileInfo, setProfileInfo] = useState({
            birth_date: '',
            level : '',
            phone: '',
            skills_user_teach: [],
            skills_user_learn: [],
            skills_user_does_not_have:[]
    
        })

    const closeModel= (e)=> {
      if (modelRef.current == e.target){
        onClose();
      }
    }

    const age =()=>{
            let today = new Date();
            let birthDay = new Date(profileInfo.birth_date)
            let age = today.getFullYear() -birthDay.getFullYear() 
            let month = today.getMonth() - birthDay.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) 
            {
                age--;
            }
            if (age){
                console.log(age);
                return (age)
    
            }
            
        }

        function getOneUSer() {
            const user= users.find(user=> user.id==userID)
            console.log(user )
            setUserInfo(user)

            const userProfile = profileList.find(pro=>pro.user == userID)
            console.log(userProfile);
            setProfileInfo(userProfile);
            return
            
        }
       
      useEffect(() => {
              getOneUSer()
          }, [])

  return (
    <div ref={modelRef} className='FormModelContener'  onClick={closeModel}>
        <div className='innerFormModelContener gred' style={{width:'90%', padding:0}}>
    
        <h1 className='profile_title'> {userInfo.first_name} {userInfo.last_name} Info </h1>
         <div className='profile_form1 grid is-col-min-7' style={{width:'100%', padding:100}}>
            
            <label className='label' htmlFor=" username">Username: </label>
            <input className='cell profile_input' style={{paddingLeft:40, widows:'100%'}} value={userInfo.username} name='username' readOnly />

            <label className='label' htmlFor="first_name">First Name: </label>
            <input className='cell profile_input' value={userInfo.first_name} name='first_name' readOnly />

            <label className='label' htmlFor="last_name">Last Name: </label>
            <input className='cell profile_input' value={userInfo.last_name} name='last_name' readOnly />

            <label className='label' htmlFor="birth_date"> Birth Date:  </label>
            <input className='cell profile_input' value={userInfo.birth_date?age:''} type='text' name='birth_date' readOnly />

            <label className='label'  htmlFor="level" >Level: </label>
            <input className='cell profile_input' value={profileInfo.level} name='level' readOnly/>


            <label className='label' htmlFor="phone"  >Phone number: </label>
            <input className='cell profile_input' type='phone'  name='phone' value={profileInfo.phone} readOnly/>

            <label className='label' htmlFor="email">Email: </label>
            <input className='cell profile_input' type='email' value={userInfo.email} name='email' readOnly />
            <h1 className='label'>certificates:</h1>
            <ul>
                {userInfo.certificates?userInfo.certificates.map(certificate=>{
                        return(
                            <li className='label'>{certificate.name} - {certificate.type}</li>
                        )
                    }
                    )
                    :
                    <p>Dosen't have certificates</p>
                    }
            </ul>
            <h1 className='label'>experiences:</h1>
            <ul>
                {userInfo.experiences?userInfo.experiences.map(experience=>{
                        return(
                            <li className='label'>{experience.title}</li>
                        )
                    }
                    )
                    :
                    <p>Dosen't have Experiences</p>
                    }
            </ul>
         </div> 
            <ul className="sci" style={{position:'ry'}} >
                            <li style={{"--i":1}}>
                            <a href={`mailto:${userInfo.email}`}><i className="fa fa-envelope" aria-hidden="true"> Contact Me </i></a>
                            </li>
                        </ul>
    
         </div>        
        
    </div>
  )
}

export default UserDetail