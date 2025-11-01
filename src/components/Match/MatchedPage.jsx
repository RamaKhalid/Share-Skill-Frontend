import { useLocation } from 'react-router-dom';

function MatchedPage() {
    const location = useLocation();
    const { data } = location.state || {};  // safely extract the passed data

  console.log("Received data:", data);

  function getSkil(skillId){
       const skill = data.skill_data.find(skill=> skill.id === skillId)
        if (skill)
        return skill.name
    }
  
  function getUsersSkil(userID){
       const userSkill = data.users_can_teach_and_learn_by_you.find(profile=> profile.user === userID)
        if (userSkill)
            console.log('kk',userSkill);
            
        // getSkil( userSkill.skill)
    }

  function getUsersId(userID){
       const userProfile = data.profile_user.find(profile=> profile.user === userID)
        if (userProfile)
        {
            console.log(userProfile.user);
            getUsersSkil(userProfile.user)

        }
            
    }
  
    return (
    <div>
        <h1>Perfect Match!</h1>
        <div className="container">
        {
            data.users_can_teach_and_learn_by_you.length  
                ?
                data.user_match.map((user) => {
                    return (
                        <div className="card" key={user.id}>
                        <div className="content">
                            <div className="img"><img src="https://unsplash.it/200/200"/></div>
                            <div className="cardContent">
                            <h3>{user.first_name} - {user.last_name}<br/>
                            <span>Can Teach:{getUsersId(user.id)} </span></h3>
                            </div>
                        </div>
                        <ul className="sci">
                            <li style={{"--i":1}}>
                            <a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                </div>
                    )
                })
                :
                <h2>No Users</h2>
            }
    </div>
    </div>
  )
}

export default MatchedPage