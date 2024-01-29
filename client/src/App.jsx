import { useState, useEffect } from 'react'
import {listOfUsers} from "../pretendDb.js";
import User from "./components/User.jsx";
import './App.css'

function App() {
  let [count, setCount] = useState(0);
  const [users, setUsers] = useState([]); 
  const links =  ["link1", "link2", "link3"];

  const handleClick = () =>{
    setCount(count + 1);

  }

  useEffect( () => {
    // fetch data from server   getAllUsers

    setUsers(listOfUsers);
  }, [])

  return (
    <div className="App">
     <header>
        <h1>Event Planner</h1>
        {
         links.map((link, index) => <a  key = {index} href="#">{link}</a>)
        }
     </header>
     <div className="users-container">
      {
        users.map( user => {
          return (
            <User name={user.name} age={user.age}/>
            ); 
        })
      }
     </div>
     <button onClick={handleClick}>increment counter</button>
     <p id="counter">{count}</p>
    </div>
  )
}

export default App
