import { useNavigate } from "react-router-dom";
import "./Month.css";

const MiniEvent = ({ event }) => {
	return (
		<div className="MiniEvent">
			<p>{event.name}</p>
		</div>
	);
};

const MiniDay = ({ events, day, month, year, weekDay, monthStatus }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/Day", { state: { day, month, year } });
	};

	return (
		<div className={`MiniDay ${monthStatus}`}>
			<div className="mini-day-header">
				<button className="mini-button" onClick={handleClick}>
					{day}
				</button>
				{weekDay.length > 0 && <p>{weekDay}</p>}
			</div>

			<div className="mini-event-container">
				{events.map((e, index) => {
					if (index < 3) return <MiniEvent event={e} key={index} />;
					else if (index === 4) {
						return <div>{"Handle having >= 4 events on the same day"}</div>;
					}
				})}
			</div>
		</div>
	);
};

export default MiniDay;
