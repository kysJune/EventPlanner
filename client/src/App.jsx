import Weather from "./components/weather/Weather";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import SearchResults from "./components/searchResults/SearchResults.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Cookies from "universal-cookie";

// Create a new instance of the Cookies class
export const cookies = new Cookies();
import Day from "./components/day/Day.jsx";
import Month from "./components/month/Month.jsx";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/Login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/Weather" element={<Weather />} />
					<Route path="/Month" element={<Month />} />
					<Route path="/SearchResults" element={<SearchResults />} />
					{/* <Route path="/Year" element={<Year />} /> */}
					<Route path="/Day" element={<Day />} />
					<Route path="/" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
