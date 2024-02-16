import { useEffect, useState } from "react";
import axios from "axios";
import { cookies } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = ({}) => {
	const [username, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if(cookies.get("isLoggedIn")){
			navigate("/Month");
		}
	}, []);
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = async () => {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/user/login`,
			{ username, password },
			{ withCredentials: true }
		);
		if (response.status === 200) {
			cookies.set("isLoggedIn", "true");
			cookies.set("username", username);
			navigate("/Month");
		}
	};

	return (
		<div className="Login">
			<div className="login-card">
				<h1>Login</h1>
				<label htmlFor="username">Username</label>
				<input
					placeholder="Type your username"
					type="text"
					id="username"
					onChange={handleNameChange}
					value={username}
				/>
				<label htmlFor="password">Password</label>
				<input
					placeholder="Type your password"
					type="password"
					id="password"
					onChange={handlePasswordChange}
					value={password}
				/>
				<p>
					Don't have an account? <a href="/register"> Register here</a>
				</p>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
};

export default Login;
