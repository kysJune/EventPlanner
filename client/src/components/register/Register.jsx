import { useState } from "react";
import axios from "axios";

export const Register = ({}) => {
	const [username, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleRegister = async () => {
		if (confirmPassword !== password) {
			//TODO display password mismatch
			alert("kys");
			return;
		}
		const response = await axios.post("/user/register", { username, password });
		if (response.data.status !== 200) {
			console.error("login failed");
			alert(response.data.message);
		}
	};

	return (
		<div className="Register">
			<input type="text" id="username" onChange={handleNameChange} value={username} />
			<input type="password" id="password" onChange={handlePasswordChange} value={password} />
			<input
				type="password"
				id="confirm-password"
				onChange={handleConfirmPasswordChange}
				value={confirmPassword}
			/>
			<button onClick={handleRegister}>Register</button>
		</div>
	);
};

export default Register;
