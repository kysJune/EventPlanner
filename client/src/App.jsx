import Weather from "./components/weather/Weather";
import { Login } from "./components/login/Login";
import Home from "./components/home/Home";
// import { Register } from "./components/register/Register";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";

function App() {

	return (
		<div className="App">
			<BrowserRouter>
			<Routes>
				<Route path="/Login" element={<Login/>} />
				{/* <Route path="/register" element={<Register/>} />  */}
				<Route path="/Weather" element={<Weather/>} />
				<Route path="/" element={<Home/>} />
			</Routes>
			</BrowserRouter>
		</div>
	);
}




export default App;
