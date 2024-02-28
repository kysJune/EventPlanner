import { useEffect, useState } from "react";
import "./Venues.css";
import { cookies } from "../../App";
import Header from "../header/Header";
import Modal from "react-modal";
import customAxios from "../../config/customAxios";
import isValidEvent, { get24HourTime } from "../day/algorithms.js";

const Venues = () => {
	const [venues, setVenues] = useState([]);
	const [userLocation, setUserLocation] = useState(cookies.get("location") || "");
	const [category, setCategory] = useState("");

	const [eventCity, setEventCity] = useState("");
	const [eventState, setEventState] = useState("");

	const fetchVenues = async () => {
		//make a request to the foursquare api to get a list of 10 venues for the location and the
		//category of the event
		try {
			const searchParams = new URLSearchParams({
				query: category.length > 0 ? category : "bar", //TODO: default to something that makes sense
				near: `${eventCity}, ${eventState}`,
				sort: "DISTANCE",
				fields: "price,name,location"
			});
			const results = await fetch(`https://api.foursquare.com/v3/places/search?${searchParams}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: import.meta.env.VITE_FOURSQUARE_ACCESS_TOKEN
				}
			});
			const data = await results.json();
			console.table("the response from foursquare: ", data.results);
			setVenues(data.results);
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
				<div className="location-container">
					<input
						type="text"
						id="user-location-input"
						value={eventCity}
						placeholder="Enter City"
						onChange={(e) => setEventCity(e.target.value)}
					/>
					<select value={eventState} onChange={(e) => setEventState(e.target.value)}>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>
				</div>
				<label htmlFor="category-input">What are you looking for?</label>
				<input
					type="text"
					id="user-location-input"
					value={category}
					placeholder="Type of Event"
					onChange={(e) => setCategory(e.target.value)}
				/>
				<button className="venue-search" onClick={fetchVenues}>
					Get Venues
				</button>
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
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newEventName, setNewEventName] = useState(venue.name);
	const [newEventStartTime, setNewEventStartTime] = useState("");
	const [newEventEndTime, setNewEventEndTime] = useState("");
	const [newEventDescription, setNewEventDescription] = useState("");
	const [newEventDate, setNewEventDate] = useState("");
	const [newEventLocation, setNewEventLocation] = useState(venue.location.address);

	const handleVenueClick = () => {
		setModalIsOpen(true);
	};

	const handleCreateEvent = async () => {
		if (!isValidEvent(newEventName, newEventStartTime, newEventEndTime)) return;
		try {
			const response = await customAxios.post(
				`/event/create`,
				{
					name: newEventName,
					start: get24HourTime(newEventStartTime),
					end: get24HourTime(newEventEndTime),
					day: Number(day),
					month: Number(month),
					year: Number(year),
					location: newEventLocation,
					description: newEventDescription
				},
				{ withCredentials: true }
			);

			if (response.status === 201) {
				setEvents([...events, response.data]);
				setModalIsOpen(false);
				clearModalFields();
				setRefreshEvents(!refreshEvents);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const formatPrice = () => {
		let price = venue.price;
		if (price === undefined) {
			return null;
		}
		let priceString = "";
		for (let i = 0; i < price; i++) {
			priceString += "$";
		}
		return priceString;
	};

	return (
		<div className="venue" key={venue.id}>
			<h2 className="venue-name">{venue.name}</h2>
			<p className="venue-location">{venue.location.address}</p>
			<p className="venue-price">{formatPrice()}</p>
			<button onClick={handleVenueClick}>Create Event</button>

			{/* ----------------------------------------MODAL---------------------------------------- */}
			<Modal isOpen={modalIsOpen} contentLabel="Create an Event Modal" className="Modal">
				<header className="modal-header">
					<input
						type="text"
						id="new-event-name"
						onChange={(e) => {
							setNewEventName(e.target.value);
						}}
						value={newEventName}
						placeholder="Add title"
					/>
					<button
						className="modal-button"
						onClick={() => {
							setModalIsOpen(false);
							clearModalFields();
						}}
					>
						X
					</button>
				</header>

				<div className="modal-controls">
					<div className="modal-control">
						<label htmlFor="new-event-date">Date</label>
						<input
							required
							id="new-event-date"
							type="time"
							onChange={(e) => {
								setNewEventDate(e.target.value);
							}}
						/>
					</div>
					<div className="modal-control">
						<label htmlFor="new-event-start-time">Start Time</label>
						<input
							required
							id="new-event-start-time"
							type="time"
							onChange={(e) => {
								setNewEventStartTime(e.target.value);
							}}
						/>
					</div>
					<div className="modal-control">
						<label htmlFor="new-event-end-time">End Time</label>
						<input
							required
							id="new-event-end-time"
							type="time"
							onChange={(e) => {
								setNewEventEndTime(e.target.value);
							}}
						/>
					</div>

					<div className="modal-control">
						<label htmlFor="new-event-location">Location</label>
						<input
							id="new-event-location"
							value={newEventLocation}
							onChange={(e) => setNewEventLocation(e.target.value)}
						/>
					</div>

					<div className="modal-control">
						<label htmlFor="new-event-description">Description</label>
						<textarea required onChange={(e) => setNewEventDescription(e.target.value)}></textarea>
					</div>

					<button className="modal-button create-event-button" onClick={handleCreateEvent}>
						Create Event
					</button>
				</div>
			</Modal>
			{/* ----------------------------------------MODAL---------------------------------------- */}
		</div>
	);
};

export default Venues;
