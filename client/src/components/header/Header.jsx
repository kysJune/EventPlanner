import "./Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../App.jsx";
import { removeCookies } from "./algorithms.js";
// import {Register} from "../register/Register"
// import { Login } from "../login/Login";

const Header = ({ isLoggedIn }) => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleRegister = () => {
		navigate("/register");
	};

	const handleLogout = () => {
		//TODO send http request to logoutController
		//cookies.remove({...cookies.getAll()});
		removeCookies();
		navigate("/");
	};
	return (
		<header className="header">
			<h1 className="title">Event Planner</h1>
			{cookies.get("isLoggedIn") ? (
				<div className="loggedInUser">
					<p className="username"> {cookies.get("username")} </p>
					<button onClick={handleLogout}>Logout</button>
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
