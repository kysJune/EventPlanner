import { useState, useEffect } from "react";
import { listOfUsers } from "../pretendDb.js";
import User from "./components/User.jsx";
import "./App.css";
import Weather from "./components/weather/Weather.jsx";

function App() {
	let [count, setCount] = useState(0);
	const [users, setUsers] = useState([]);
	const links = ["link1", "link2", "link3"];

	const handleClick = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		// fetch data from server   getAllUsers

		setUsers(listOfUsers);
	}, []);

	return (
		<div className="App">
			<header>
				<h1>Event Planner</h1>
				<nav className="nav-links"></nav>
			</header>
			<Weather />
		</div>
	);
}

export default App;
