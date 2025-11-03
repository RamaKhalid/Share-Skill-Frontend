import { useLocation } from 'react-router-dom';

function MatchedPage() {
    const location = useLocation();
    const { data } = location.state || {};  

  console.log("Match data:", data);

  function getSkil(skillId){
       const skill = data.Learn_skill_data.find(skill=> skill.id === skillId)
        if (skill)
        return skill.name
    }
  
  function getUsersSkil(userID){    
       const userSkill = data.users_can_teach_and_learn_by_you.find(profile=> profile.user === userID)
        if (userSkill)
            // console.log(userSkill.skill);
            return getSkil( userSkill.skill)
    }

  function getUsersId(userID){
       const userProfile = data.profile_user.find(profile=> profile.user === userID)
        if (userProfile)
        {
            // console.log(userProfile.id);
            return getUsersSkil(userProfile.id)
        }  
    }

    function getUserTeachSkill(userID){
        const userProfile = data.profile_user.find(profile=> profile.user === userID)
        if (userProfile)
            {
                // console.log(userProfile.id);
                const userSkillList = data.users_can_teach_you.filter(profile=> profile.user === userProfile.id)
                if (userSkillList){
                    // console.log(userSkillList);
                    return userSkillList.map(user=> {
                        const skill = data.teach_skill_data.find(skill=> skill.id === user.skill)
                        if (skill)
                        // {console.log(skill.name);
                        return <p key={skill.id}>{skill.name}</p>
                        // }
                        
                    })
                } 
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
                            <span>Can Teach:{getUserTeachSkill(user.id)} </span><br/>
                            <span>To Learn:{getUsersId(user.id)} </span>
                            </h3>
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