
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
		const response = await axios.post("/user/login", { username, password });
	};

	return (
		<div className="Login">
			<input type="text" id="username" onChange={handleNameChange} value={username} />
			<input type="password" id="password" onChange={handlePasswordChange} value={password} />
		</div>
	);
};

export default Login;
