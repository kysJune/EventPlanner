import { useState } from "react";
import "./Weather.css";
import axios from "axios";
import Header from "../header/Header";
import { convertKelvinToFahrenheit, getIcon } from "./Logic";

const Weather = () => {
	const [city, setCity] = useState("");
	const [error, setError] = useState(null);
	const [temperature, setTemperature] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState("");
	const [showWeather, setShowWeather] = useState(false);
	const [cityName, setCityName] = useState("");

	const handleCityChange = (e) => {
		setCity(e.target.value);
	};

	const getWeather = async () => {
		//create the url based on the city
		//the city may have a space in it EX: san francisco
		//need to replace the space with %20 to represent it in the url.
		const encodedCity = city.split(" ").join("%20");
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
		console.log(url);
		try {
			const response = await axios.get(url);
			console.log(response.data);
			setTemperature(convertKelvinToFahrenheit(response.data.main.temp));
			setDescription(response.data.weather[0].description);
			setShowWeather(true);
			setIcon(getIcon(response.data.weather[0].icon));
			setCityName(response.data.name);
		} catch (err) {
			setError(`encountered error: ${err}`);
			console.log(err);
		}
	};

	return (
		<div className="weather">
			{/* <Header /> */}
			<div className="city-input">
				<label htmlFor="city">City</label>
				<input type="text" name="city" id="city" value={city} onChange={handleCityChange} />
				<button onClick={getWeather}>Get Weather</button>
			</div>
			
			{showWeather && (
				<div className="weather-info">
					<h2>{`Current Weather in ${cityName}`}</h2>
					<img src={icon} alt="weather icon" />
					<p>Temperature: {temperature}F</p>
					<p>{description}</p>
				</div>
			)}
		</div>
	);
};

export default Weather;
