import { useState } from "react";
import customAxios from "../../config/customAxios.js";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../App.jsx";
import "./Register.css";

export const Register = ({}) => {
	const [username, setName] = useState("");
	const [password, setPassword] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

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
		try {
			if (confirmPassword !== password) {
				//TODO display password mismatch
				alert("Passwords do not match");
				return;
			}
			const response = await customAxios.post(`/user/register`, {
				username,
				password,
				location: city.length > 3 && state.length === 2 ? `${city}, ${state}` : undefined
			});
			if (response.status !== 200) {
				console.error("register failed");
				alert(response.data.message);
			} else {
				cookies.set("isLoggedIn", "true");
				cookies.set("username", username);
				if (city.length > 0 && state.length > 0) {
					cookies.set("location", `${city}, ${state}`);
				}
				navigate("/Month");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="Register">
			<div className="register-card">
				<h1>Register</h1>
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
				<input
					placeholder="Confirm Password"
					type="password"
					id="confirm-password"
					onChange={handleConfirmPasswordChange}
					value={confirmPassword}
				/>
				<input
					placeholder="City"
					type="text"
					id="city"
					onChange={(e) => setCity(e.target.value)}
					value={city}
				/>
				<input
					placeholder="State"
					type="text"
					id="state"
					onChange={(e) => setState(e.target.value)}
					value={state}
				/>
				<p>
					Already have an account? <a href="/"> Login here</a>
				</p>
				<button onClick={handleRegister}>Register</button>
			</div>
		</div>
	);
};
export default Register;
