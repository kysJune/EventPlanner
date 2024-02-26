import { useEffect, useState } from "react";
import "./Venues.css";
import { cookies } from "../../App";
import Header from "../header/Header";

const Venues = () => {
	const [venues, setVenues] = useState([]);
	const [userLocation, setUserLocation] = useState(cookies.get("location") || "");
	const [category, setCategory] = useState("");


    const fetchVenues = async () => {
        //make a request to the foursquare api to get a list of 10 venues for the location and the
        //category of the event
        try {
            const searchParams = new URLSearchParams({
                query: category.length > 0 ? category : "coffee", //TODO: default to something that makes sense
                near: userLocation,
                sort: "DISTANCE"
            });
            const results = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: import.meta.VITE_FOURSQUARE_ACCESS_TOKEN
                }
            });
            const data = await results.json();
            console.degub("the response from foursquare: ", data);
            setVenues(data.response.venues);
        } catch (err) {
            console.error(err);
        }
    };


	useEffect(() => {
		if (userLocation.length === 0) {
			return;
		}
		
		fetchVenues();
	}, []);

	return (
		<div className="Venues">
            <Header />
            <div className="venue-controls">
                <label htmlFor="user-location-input">Location</label>
                <input
                    type="text"
                    id="user-location-input"
                    value={userLocation}
                    placeholder="Type your location"
                    onChange={() => setUserLocation(e.target.value)}
                />
                <button className="venue-search" onClick={fetchVenues}>Get Venues</button>
            </div>
			
			{venues.length === 0 ? (
				<p>No venues found</p>
			) : (
				<div className="results-container">
					{venues.map((venue, index) => (
						<Venue venue={venue} key={index} />
					))}
				</div>
			)}
		</div>
	);
};

const Venue = ({ venue }) => {
	return (
		<div className="venue" key={venue.id}>
			<h2>{venue.name}</h2>
		</div>
	);
};

export default Venues;
