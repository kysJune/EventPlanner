import { useState } from 'react'

import './App.css'

function App() {
  let [count, setCount] = useState();
   
  const links =  ["link1", "link2", "link3"];

  const handleClick = () =>{
    setCount(count + 1);

  }

  return (
    <>
     <header>
        <h1>Event Planner</h1>
        {
         links.map((link, index) => <a  key = {index} href="#">{link}</a>)
        }
     </header>
     <button onClick={handleClick}>increment counter</button>
     <p id="counter">{count}</p>
    </>
  )
}

export default App
