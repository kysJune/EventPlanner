import "./Day.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import isValidEvent, { convert24HourToString, get24HourTime, isTodaysDate } from "./algorithms";
import { getDay, WeekDay } from "../../../../server/utils/CalculateWeekDay";
import Weather from "../weather/Weather";
import Header from "../header/Header.jsx";
import { getCurrentDay, getCurrentMonth, getCurrentYear } from "../month/algorithms.js";
import { StatusCodes } from "http-status-codes";
import { numDaysInMonth } from "../../../../server/utils/CalculateWeekDay.ts";
import customAxios from "../../config/customAxios.js";

const Day = () => {
	const location = useLocation();
	const [events, setEvents] = useState([]);
	const [day, setDay] = useState(location?.state?.day || getCurrentDay());
	const [month, setMonth] = useState(location?.state?.month || getCurrentMonth());
	const [year, setYear] = useState(location?.state?.year || getCurrentYear());
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newEventName, setNewEventName] = useState("");
	const [newEventStartTime, setNewEventStartTime] = useState("");
	const [newEventEndTime, setNewEventEndTime] = useState("");
	const [newEventDescription, setNewEventDescription] = useState("");
	const [newEventLocation, setNewEventLocation] = useState("");
	const [refreshEvents, setRefreshEvents] = useState(false);
	const [isToday, setIsToday] = useState(false);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await customAxios.post(`/event/list`, {
					day: Number(day),
					month: Number(month),
					year: Number(year)
				});
				if (response.data.userEvents === undefined || response.status === 204) {
					setEvents([]);
					return;
				}
				setEvents([...response.data.userEvents]);
			} catch (error) {
				console.error(error);
			}
		};
		setIsToday(isTodaysDate(Number(day), Number(month), Number(year)));
		fetchEvents();
	}, [refreshEvents, day, month, year]);

	useEffect(() => {
		setDay(location?.state?.day || getCurrentDay());
		setMonth(location?.state?.month || getCurrentMonth());
		setYear(location?.state?.year || getCurrentYear());
	}, [location?.state?.day, location?.state?.month, location?.state?.year]);

	const clearModalFields = () => {
		setNewEventName("");
		setNewEventStartTime("");
		setNewEventEndTime("");
		setNewEventDescription("");
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
					description: newEventDescription,
					location: newEventLocation.length == 0 ? undefined : newEventLocation
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

	const handlePrevDayClick = () => {
		if (Number(day) === 1) {
			console.log(month, year);
			setMonth(Number(month) - 1 < 0 ? 11 : Number(month) - 1);
			if (Number(month) === 11) {
				setYear(year - 1);
			}
			setDay(numDaysInMonth(Number(year), Number(month - 1)));
		} else {
			setDay(Number(day) - 1);
		}
		setRefreshEvents(!refreshEvents);
	};
	const handleNextDayClick = () => {
		if (Number(day) === numDaysInMonth(Number(year), Number(month))) {
			setDay(1);
			setMonth(Number(month) + 1 > 11 ? 0 : Number(month) + 1);
			if (Number(month) === 0) {
				setYear(Number(year) + 1);
			}
		} else {
			setDay(Number(day) + 1);
		}
		setRefreshEvents(!refreshEvents);
	};

	return (
		<div className="day">
			<Header />
			<div className="day-container">
				<header>
					<button className="day-control-button" onClick={handlePrevDayClick}>
						{"<"}
					</button>

					<div className="day-header">
						<h1 className="day-weekday">
							{WeekDay[getDay(Number(day), Number(month), Number(year))].toUpperCase()}
						</h1>
						<h1>{`${Number(month) + 1}/${day}/${year}`}</h1>
					</div>
					<button className="day-control-button" onClick={handleNextDayClick}>
						{">"}
					</button>
				</header>
				{/* if it's the current day, show the current weather */}
				{isToday && <Weather />}
				<button onClick={() => setModalIsOpen(true)}>Create Event</button>
				{
					//put all the hours on the page
					Array.from({ length: 24 }, (v, i) => {
						return (
							<>
								<hr />
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
														<DayEvent
															setRefreshEvents={setRefreshEvents}
															refreshEvents={refreshEvents}
															event={event}
															start={start}
															end={end}
															key={index}
														/>
													);
												}
											})
									}
								</div>
							</>
						);
					})
				}
			</div>
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

const DayEvent = ({ event, start, end, setRefreshEvents, refreshEvents }) => {
	const [showDescription, setShowDescription] = useState(false);

	const handleDeleteEvent = async (eventId) => {
		try {
			const response = await customAxios.delete(`/event/${eventId}/delete`);

			if (response.status !== StatusCodes.NO_CONTENT) {
				console.error("PANIC : Failed to delete");
			} else if (response.status === StatusCodes.NO_CONTENT) {
				setRefreshEvents(!refreshEvents);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div key={event._id} className="event">
			<div className="event-top">
				<h3 className="event-name">{event.name}</h3>
				<button className="delete-event" onClick={() => handleDeleteEvent(event._id)}>
					X
				</button>
			</div>
			<p className="event-duration">{`from ${convert24HourToString(start)} to ${convert24HourToString(end)}`}</p>
			{event?.description && (
				<button
					className="description-button"
					onClick={() => {
						setShowDescription(!showDescription);
					}}
				>
					{showDescription ? "hide" : "show more"}
				</button>
			)}
			{showDescription && <p className="event-description">{event.description}</p>}
		</div>
	);
};

export default Day;
