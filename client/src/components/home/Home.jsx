import "./Home.css";
import { useNavigate } from "react-router-dom";
import Day from "../day/Day";
import Header from "../header/Header.jsx";

const Home = () => {
	// const navigate = useNavigate();

	// const handleLogin = () => {
	// 	navigate("/login");
	// };

	// const handleRegister = () => {
	// 	navigate("/register");
	// };

	return (
		<div className="home">
			<Header />
			<header>
				<nav>
					{/* <button onClick={handleLogin}>login</button>
					<button onClick={handleRegister}>register</button> */}
				</nav>
			</header>
			<h1 className="weather">Welcome to the Weather App</h1>
		</div>
	);
};

export default Home;
