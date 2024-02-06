import "./Month.css";
import MiniDay from "./MiniDay.jsx";

const Month = ({ month, year }) => {
	// query all events for the loggedin user for the given month and year

	// first day of the week for that month

	// number of days in that month

	const weeks = [];
	const numWeeks = 6;
	for (let week = 0; week < numWeeks; week++) {
		const days = [];
		for (let i = 0; i < 7; i++) {
			days.push({
				events: [
					{
						name: "foo",
						start: 0,
						end: 24
					}
				],
				day: week * 7 + i + 1
			});
		}

		weeks.push(days);
	}

	return (
		<div className="Month">
			{weeks.map((week) => {
				return (
					<div className="week">
						{week.map((day, index) => {
							return <MiniDay key={index} events={day.events} day={day.day} month={month} year={year} />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Month;
