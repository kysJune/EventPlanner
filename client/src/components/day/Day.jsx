import "./Day.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import isValidEvent, { convert24HourToString, get24HourTime, isTodaysDate } from "./algorithms";
import { getDay, WeekDay } from "../../../../server/utils/CalculateWeekDay";
import Weather from "../weather/Weather";
import Header from "../header/Header.jsx";

const Day = () => {
	const location = useLocation();
	const [events, setEvents] = useState([]);
	const [day, setDay] = useState(location?.state?.day || 1);
	const [month, setMonth] = useState(location?.state?.month || 0);
	const [year, setYear] = useState(location?.state?.year || 2024);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newEventName, setNewEventName] = useState("");
	const [newEventStartTime, setNewEventStartTime] = useState("");
	const [newEventEndTime, setNewEventEndTime] = useState("");
	const [refreshEvents, setRefreshEvents] = useState(false);
	const [isToday, setIsToday] = useState(false);

	useEffect(() => {
		//check if the day is today

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
				);
				if (response.data.userEvents === undefined || response.status === 204) return;
				setEvents([...response.data.userEvents]);
			} catch (error) {
				console.error(error);
			}
		};
		setIsToday(isTodaysDate(Number(day), Number(month), Number(year)));
		fetchEvents();
	}, [refreshEvents]);

	const handleCreateEvent = async () => {
		if (!isValidEvent(newEventName, newEventStartTime, newEventEndTime)) return;
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/event/create`,
				{
					name: newEventName,
					start: get24HourTime(newEventStartTime),
					end: get24HourTime(newEventEndTime),
					day: Number(day),
					month: Number(month),
					year: Number(year)
				},
				{ withCredentials: true }
			);
			if (response.status === 201) {
				setEvents([...events, response.data]);
				setModalIsOpen(false);
				setRefreshEvents(!refreshEvents);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="day">
			<Header/>
			<div className="day-header">
				<h1 className="day-weekday">{WeekDay[getDay(Number(day), Number(month), Number(year))]}</h1>
				<h1>{`${Number(month) + 1}/${day}/${year}`}</h1>
			</div>
			{/* if it's the current day, show the current weather */}
			{isToday && <Weather />}
			<button onClick={() => setModalIsOpen(true)}>Create Event</button>
			{
				//put all the hours on the page
				Array.from({ length: 24 }, (v, i) => {
					return (
						<div key={i} className="hour">
							<p>{i > 11 ? `${i - 12 === 0 ? 12 : i - 12}:00 PM` : `${i === 0 ? 12 : i}:00 AM`}</p>
							{
								//put the events on the page
								events &&
									events.map((event, index) => {
										const start = event.start; //2030
										const end = event.end; //2130
										const startHour = Math.floor(start / 100) * 100;
										if (startHour === i * 100) {
											return (
												<div key={index} className="event">
													<h3 className="event-name">{event.name}</h3>
													<p className="event-duration">{`from ${convert24HourToString(start)} to ${convert24HourToString(end)}`}</p>
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

			{/* ----------------------------------------MODAL---------------------------------------- */}
			<Modal isOpen={modalIsOpen} contentLabel="Create an Event Modal">
				<header>
					<h1>Creating an event...</h1>
					<button
						className="modal-button"
						onClick={() => {
							setModalIsOpen(false);
						}}
					>
						X
					</button>
				</header>
				<div className="modal-controls">
					<div className="modal-control">
						<label htmlFor="new-event-name">Event Name</label>
						<input
							type="text"
							id="new-event-name"
							onChange={(e) => {
								setNewEventName(e.target.value);
							}}
							value={newEventName}
						/>
					</div>
					<div className="modal-control">
						<label htmlFor="new-event-start-time">Start Time</label>
						<input
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
							id="new-event-end-time"
							type="time"
							onChange={(e) => {
								setNewEventEndTime(e.target.value);
							}}
						/>
					</div>

					<button className="modal-button create-event-button" onClick={handleCreateEvent}>
						Create
					</button>
				</div>
			</Modal>
			{/* ----------------------------------------MODAL---------------------------------------- */}
		</div>
	);
};

export default Day;
