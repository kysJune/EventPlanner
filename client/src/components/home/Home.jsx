import "./Home.css";
import { useNavigate } from "react-router-dom";
import Day from "../day/Day";

const Home = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleRegister = () => {
		navigate("/register");
	};

	return (
		<div className="home">
			<header>
				<nav>
					<button onClick={handleLogin}>login</button>
					<button onClick={handleRegister}>register</button>
				</nav>
			</header>
			<h1>Welcome to the Weather App</h1>
			<Day day={1} month={1} year={2022} />
		</div>
	);
};

export default Home;