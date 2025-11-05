// source :https://www.youtube.com/watch?v=sWVgMcz8Q44&t=37s
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"



import "./SearchBar.css";

export const SearchBar = ({setSkillId, onTrigger, user}) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const selectRef =useRef()
//   const[skillID, setSkillId] = useState('')

  async function getSkills(event) {
        const response = await authRequest(
                            {method:'get',
                             url: `http://127.0.0.1:8000/ss/skills/${user.user_id}`})
        event = event.toLowerCase()
        console.log(response.data)
        const results = response.data.filter((result)=>{
            return(
                (event &&
                result &&
                result.type &&
                result.type.toLowerCase().includes(event)) 
                ||
                (event &&
                result &&
                result.name &&
                result.name.toLowerCase().includes(event)) 
            )})
            console.log(results);
            
        setResults(results);
    }


  const handleChange = (value) => {
    setInput(value);
    getSkills(value);
  };

  const handleClick = (e , id)=>{
    console.log(id);
    //Check why it tack python when i click programming
    setSkillId(id)

    console.log('ref',e.currentTarget.textContent);
    
    setInput(e.currentTarget.textContent)
    // console.log(`this is a ref: ${selectRef.current.textContent}`);
    
    onTrigger(id)
    
  }

  return (
    <div  className="search-bar-contenar">
        <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
            placeholder="Search For Skill ..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}/>
        </div>

        <div className="results-list">
            {results.map((result, id) => {
            return (
                <div key={id}  ref={selectRef}  className="search-result" onClick={(e)=>handleClick(e,result.id)} value={result.id}>
                    {result.name? result.name: result.type}
                </div>
            )
        })}
        </div>

    </div>
  );
};