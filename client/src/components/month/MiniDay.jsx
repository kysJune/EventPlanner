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

	useEffect(() => {
		//if there are more than 3 events, then truncate to three and set ellipsis
	})


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
						return <p>...</p>;
					}
					else {
						return null;
					}
				})}
			</div>
		</div>
	);
};

export default MiniDay;
