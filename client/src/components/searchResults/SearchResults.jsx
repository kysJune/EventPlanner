import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

const SearchResults = () => {
	const [events, setEvents] = useState([]);
	const [queryParameters] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(queryParameters.get("searchTerm") || "");
	const navigate = useNavigate();

	useEffect(() => {
		if (searchTerm.length === 0) {
			navigate("/");
			return;
		}

		const fetchEvents = async () => {
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
	}, [searchTerm]);

	return (
		<div className="SearchResults">
			<Header />
			<h1>Search Results</h1>
			{events.length === 0 ? (
				<p>No events found</p>
			) : (
				<ul>
					{events.map((event) => (
						<li key={event._id}>
							<SearchEvent event={event} />
						</li>
					))}
				</ul>
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
			<h2>{event.name}</h2>
			<p>{`${Number(event.month) + 1}/${event.day}/${event.year}`}</p>
		</div>
	);
};

export default SearchResults;
