import "./Day.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Event from "../event/Event";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import isValidEvent from "./algorithms";
import Header from "../header/Header";
import { getCurrentMonth, getCurrentYear, getCurrentDay } from "../month/algorithms";
const Day = () => {
	const [events, setEvents] = useState([]);
	const location = useLocation();
	// const { day, month, year } =
	// 	location.state == null ? { day: 1, month: 1, year: 2024 } : location.state;
	const [day, setDay] = useState(location?.state?.day || getCurrentDay());
	const [month, setMonth] = useState(location?.state?.month || getCurrentMonth());
	const [year, setYear] = useState(location?.state?.year || getCurrentYear());
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newEventName, setNewEventName] = useState("");
	const [newEventStartTime, setNewEventStartTime] = useState("");
	const [newEventEndTime, setNewEventEndTime] = useState("");

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
				);

				setEvents([...response.data.userEvents]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchEvents();
	}, []);

	const handleCreateEvent = async () => {
		if (!isValidEvent(newEventName, newEventStartTime, newEventEndTime)) return;
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/event/create`,
				{
					name: newEventName,
					start: newEventStartTime,
					end: newEventEndTime,
					day: Number(day),
					month: Number(month),
					year: Number(year)
				},
				{ withCredentials: true }
			);
			setEvents([...events, response.data]);
			setModalIsOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="day">
			<Header />
			<h1>{`${Number(month) + 1}/${day}/${year}`}</h1>
			<p className="day-weekday">{}</p>
			<button onClick={() => setModalIsOpen(true)}>Create Event</button>
			{
				//put all the hours on the page
				Array.from({ length: 24 }, (v, i) => {
					return (
						<div key={i} className="hour">
							<p>{i > 11 ? `${i - 12 === 0 ? 12 : i - 12}:00 PM` : `${i === 0 ? 12 : i}:00 AM`}</p>
							{
								//put the events on the page
								events.map((event, index) => {
									const start = event.start;
									const end = event.end;
									const startHour = start;
									const endHour = end;
									const startMinute = 0;
									const endMinute = 0;
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
						<label htmlFor="new-event-start-time">{`Start Time (in 24 hour time)`}</label>
						<input
							id="new-event-start-time"
							type="number"
							min={0}
							max={24}
							onChange={(e) => {
								setNewEventStartTime(Number(e.target.value));
							}}
						/>
					</div>
					<div className="modal-control">
						<label htmlFor="new-event-end-time">{`End Time (in 24 hour time)`}</label>
						<input
							id="new-event-end-time"
							type="number"
							min={0}
							max={24}
							onChange={(e) => {
								setNewEventEndTime(Number(e.target.value));
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
