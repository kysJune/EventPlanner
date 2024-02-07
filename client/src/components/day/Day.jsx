import "./Day.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "../event/Event";
import { useLocation } from "react-router-dom";
const Day = () => {
	const [events, setEvents] = useState([]);
	const location = useLocation();
	const { day, month, year } = location.state;

	console.log(day, month, year);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`/events/${day}/${month}/${year}`); //TODO: send the userid as well maybe from a context
				setEvents([...response.data]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchEvents();
	}, []);

	return (
		<div className="day">
			<h1>{`${Number(month) + 1}/${day}/${year}`}</h1>

			{
				//put all the hours on the page
				Array.from({ length: 24 }, (v, i) => {
					return (
						<div key={i} className="hour">
							<p>{i > 11 ? `${i - 12 === 0 ? 12 : i - 12}:00 PM` : `${i === 0 ? 12 : i}:00 AM`}</p>
						</div>
					);
				})
			}
			{
				//put the events on the page
				events.map((event, index) => {
					return <Event key={index} event={event} />;
				})
			}
		</div>
	);
};

export default Day;
