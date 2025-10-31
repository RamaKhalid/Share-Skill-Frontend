// source :https://www.youtube.com/watch?v=sWVgMcz8Q44&t=37s
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'


import "./SearchBar.css";

export const SearchBar = ({setSkillId, onTrigger}) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const selectRef =useRef()
//   const[skillID, setSkillId] = useState('')

  async function getSkills(event) {
        const response = await axios.get(`http://127.0.0.1:8000/ss/skills/`)
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

  const handleClick = (event)=>{
    console.log(event);
    //Check why it tack python when i click programming
    setSkillId(event)
    setInput(selectRef.current.textContent)
    // console.log(`this is a ref: ${selectRef.current.textContent}`);
    
    onTrigger(event)
    
  }

  return (
    <div>
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
                <div key={id} ref={selectRef} className="search-result" onClick={(e)=>handleClick(result.id)} value={result.id}>
                    {result.name? result.name: result.type}
                </div>
            )
        })}
        </div>

    </div>
  );
};