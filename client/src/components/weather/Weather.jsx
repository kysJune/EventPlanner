import {useState} from 'react';
import "./Weather.css";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [showWeather, setShowWeather] = useState(false);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const convertKelvinToFarenheit = (kelvin) => {
        return Math.round((kelvin - 273.15) * 9/5 + 32);
    }

    const getWeather = async () => {
        //create the url based on the city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

        try{
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            setError(`encountered error: ${err}`);
            console.log(err);
        }
    }

    return (
        <div className="weather">
            <input type="text" value={city} onChange={handleCityChange} />
            <button onClick={getWeather}>Get Weather</button>
            {
                showWeather &&
            <div className="weather-info">
                <h2>Weather</h2>
                <p>Temperature: {temperature}</p>
                <p>Description: {description}</p>
                <img src={icon} alt="weather icon" />
            </div>
            }
        </div>
    )
}

export default Weather;