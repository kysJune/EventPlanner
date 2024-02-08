import "./Day.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "../event/Event";
import { useLocation } from "react-router-dom";
const Day = () => {
	const [events, setEvents] = useState([]);
	const location = useLocation();
	const { day, month, year } = location.state;

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/event/list`,
					{
						day: Number(day),
						month: Number(month),
						year: Number(year)
					},
					{ withCredentials: true }
				); //TODO: send the userid as well maybe from a context

				setEvents([...response.data.userEvents]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchEvents();
	}, []);

	return (
		<div className="day">
			<h1>{`${Number(month) + 1}/${day}/${year}`}</h1>
			<p className="day-weekday">{}</p>
			{
				//put all the hours on the page
				Array.from({ length: 24 }, (v, i) => {
					return (
						<div key={i} className="hour">
							<p>{i > 11 ? `${i - 12 === 0 ? 12 : i - 12}:00 PM` : `${i === 0 ? 12 : i}:00 AM`}</p>
							{
								//put the events on the page
								events.map((event, index) => {
									const start = new Date(event.start);
									const end = new Date(event.end);
									const startHour = start;
									const endHour = end;
									const startMinute = start;
									const endMinute = end;
									if (startHour === i) {
										return (
											<div key={index} className="event">
												<h3>{event.name}</h3>
												<p>{`${startHour > 11 ? `${startHour - 12 === 0 ? 12 : startHour - 12}` : `${startHour === 0 ? 12 : startHour}:${startMinute} PM`}`}</p>
												<p>{`${endHour > 11 ? `${endHour - 12 === 0 ? 12 : endHour - 12}` : `${endHour === 0 ? 12 : endHour}:${endMinute} PM`}`}</p>
											</div>
										);
									}
								})
							}
							<hr />
						</div>
					);
				})
			}
		</div>
	);
};

export default Day;
