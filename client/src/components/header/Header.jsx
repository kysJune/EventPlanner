import "./Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../App.jsx";
import { removeCookies } from "./algorithms/algorithms.js";
import customAxios from "../../config/customAxios.js";
import Searchbar from "./Searchbar.jsx";
import { StatusCodes } from "http-status-codes";

const Header = () => {
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
	const navVenues = () => {
		navigate("/venues");
	};
	const handleLogout = async () => {
		try {
			const result = await customAxios.post(`/user/logout`);
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
			{/* <a className="titleContainer" href="/"> */}
			<img id="site-logo" src="/images/newLogo.png" onClick={() => navigate("/")} />
			{/* </a> */}

			{cookies.get("isLoggedIn") ? (
				<div className="loggedInUser">
					<div className="searchBarContainer">
						<Searchbar />
					</div>
					<div className="header-right">
						<p className="username" id="username">
							{cookies.get("username").toUpperCase()}{" "}
						</p>
						<div className="buttons">
							<button className="button" onClick={navVenues}>
								Venues
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
					</div>
					{/*TODO change the button to instead show the current weather icon based on the users cookie's location value  */}
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
