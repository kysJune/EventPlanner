import "./Event.css";

const Event = ({ event }) => {
	//TODO: figure out how to display the event in the Day component based on its start and end time
	//maybe use a display: grid and grid-template-columns: repeat(24, 1fr) to represent the hours of the day
	//and then use grid-column-start and grid-column-end to represent the start and end time of the event
	return (
		<div className="event">
			<h3>{event.title}</h3>
			{/* <p>{event.description}</p> Do we want this field for events?*/}
			<p>{event.startTime}</p>
			<p>{event.endTime}</p>
		</div>
	);
};

export default Event;
