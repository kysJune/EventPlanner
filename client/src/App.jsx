import "./App.css";
import Login from "./components/login/login.jsx";
import Register from "./components/register/Register.jsx";
import Weather from "./components/weather/Weather.jsx";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Event Planner</h1>
				<nav className="nav-links"></nav>
			</header>
			<Weather />
			<Login />
			<Register />
		</div>
	);
}

export default App;
