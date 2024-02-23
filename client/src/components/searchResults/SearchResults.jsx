import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import "./SearchResults.css";
import { Month } from "../../../../server/utils/CalculateWeekDay";
import { getDayOfWeek } from "./algorithms";

const SearchResults = () => {
	const [events, setEvents] = useState([]);
	const [queryParameters] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(queryParameters.get("searchTerm") || "");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (searchTerm.length === 0) {
			navigate("/");
			return;
		}

		const fetchEvents = async () => {
			setSearchTerm(queryParameters.get("searchTerm") || "");
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/event/search`,
					{ searchTerm },
					{ withCredentials: true }
				);
				if (response.status === 204) {
					setEvents([]);
					return;
				}
				if (response.status === 200) {
					console.log("response.data.userEvents: ", response.data.userEvents);
					setEvents([...response.data.userEvents]);
				} else {
					console.error(response.status, response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchEvents();
	}, [searchTerm, location.search]);

	return (
		<div className="SearchResults">
			<Header />
			<h1>Search Results</h1>

			{events.length === 0 ? (
				<p>No events found</p>
			) : (
				<div className="results-container">
					{events.map((event) => (
						<SearchEvent event={event} key={event._id} />
					))}
				</div>
			)}
		</div>
	);
};

const SearchEvent = ({ event }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/day", { state: { day: event.day, month: event.month, year: event.year } });
	};

	return (
		<div className="SearchEvent" onClick={handleClick}>
			<div className="date-container">
				<h3 className="day-event">{Number(event.day)}</h3>
				<p className="month-event">{`${Month[Number(event.month)]} ${Number(event.year)} ${getDayOfWeek(event.day, event.month, event.year)}`}</p>
			</div>
			<div className="duration-container"></div>
			<p className="event-title">{event.name}</p>
		</div>
	);
};

export default SearchResults;
