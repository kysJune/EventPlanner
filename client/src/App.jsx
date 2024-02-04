import Weather from "./components/weather/Weather";
import "./App.css";
import Register from "./components/register/Register.jsx";
import { Login } from './components/login/Login.jsx';
import './App.css'


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
