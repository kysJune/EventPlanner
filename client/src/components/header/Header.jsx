import "./Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../App.jsx";
import { removeCookies } from "./algorithms/algorithms.js";
import Clock from "./algorithms/clock.jsx";
import SearchBar from "./algorithms/searchbar.jsx";

const Header = ({ isLoggedIn }) => {
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
	const navAbout = () => {
		navigate("/about");
	};
	const handleLogout = () => {
		//TODO send http request to logoutController
		//cookies.remove({...cookies.getAll()});
		removeCookies();
		navigate("/");
	};

	return (
		<header className="header">
			<a className="titleContainer" href="/">
				<Clock className="clock" />
				<h1 className="title">Event Planner </h1>
			</a>

			{cookies.get("isLoggedIn") ? (
				<div className="loggedInUser">
					<SearchBar />
					<p className="username"> {cookies.get("username")} </p>
					{/*TODO change the button to instead show the current weather icon based on the users cookie's location value  */}
					<button className="button" onClick={navWeather}>
						Weather
					</button>
					<button className="button" onClick={navAbout}>
						About
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
