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
		try{
			if (confirmPassword !== password) {
				//TODO display password mismatch
				alert("kys");
				return;
			}
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, { username, password });
			if (response.status !== 200) {
				console.error("register failed");
				alert(response.data.message);
			}
		}
		catch(error) {
			console.error(error);
		}
	};

	return (
		<form className="Register">
			<input placeholder="Username" type="text" id="username" onChange={handleNameChange} value={username} />
			<input placeholder="Password" type="password" id="password" onChange={handlePasswordChange} value={password} />
			<input placeholder="Confirm Password" type="password" id="confirm-password" onChange={handleConfirmPasswordChange} value={confirmPassword}/>
			<button onClick={handleRegister}>Register</button>
		</form>
	);
};
export default Register;
