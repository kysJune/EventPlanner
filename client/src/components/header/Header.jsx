import "./Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../App.jsx";
import { removeCookies } from "./algorithms/algorithms.js";
import axios from "axios";
import Searchbar from "./Searchbar.jsx";
import { StatusCodes } from "http-status-codes";

const Header = ({ isLoggedIn }) => {
	const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleRegister = () => {
		navigate("/register");
	};
	const navWeather = () => {
		navigate("/weather");
	};
	const navYear = () => {
		navigate("/year");
	};
	const navDay = () => {
		navigate("/Day");
	};
	const navMonth = () => {
		navigate("/month");
	};
	const handleLogout = async () => {
		try {
			const result = await axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true });
			if (result.status === StatusCodes.OK) {
				removeCookies();
				navigate("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<header className="HeaderHeader">
			<a className="titleContainer" href="/">
				<h1 className="title">Event Planner</h1>
			</a>

			{cookies.get("isLoggedIn") ? (
				<div className="loggedInUser">
					<div className="searchBarContainer">
						<Searchbar />
					</div>

					<p className="username">{cookies.get("username").toUpperCase()} </p>
					{/*TODO change the button to instead show the current weather icon based on the users cookie's location value  */}
					<button className="button" onClick={navWeather}>
						Weather
					</button>
					<button className="button" onClick={navYear}>
						Year
					</button>
					<button className="button" onClick={navMonth}>
						Month
					</button>
					<button className="button" onClick={navDay}>
						Day
					</button>
					<button className="button" onClick={handleLogout}>
						Logout
					</button>
				</div>
			) : (
				<nav className="loggedOutUser">
					<button onClick={handleLogin}>Login</button>
					<button onClick={handleRegister}>Register</button>
				</nav>
			)}
		</header>
	);
};

export default Header;
