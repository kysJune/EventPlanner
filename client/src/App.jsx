import Weather from "./components/weather/Weather";
import { Login } from "./components/login/Login";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Event Planner</h1>
				<nav className="nav-links"></nav>
			</header>
			<Weather />
			<Login />
		</div>
	);
}

export default App;
