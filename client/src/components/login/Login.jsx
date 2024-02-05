import { useState } from "react";
import axios from "axios";

export const Login = ({}) => {
	const [username, setName] = useState("");
	const [password, setPassword] = useState("");

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
	};

	return (
		<div className="Login">
			<input
				placeholder="Username"
				type="text"
				id="username"
				onChange={handleNameChange}
				value={username}
			/>
			<input
				placeholder="Password"
				type="password"
				id="password"
				onChange={handlePasswordChange}
				value={password}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
