import "./Month.css";
import MiniDay from "./MiniDay.jsx";
import {
	Month as MonthEnum,
} from "../../../../server/utils/CalculateWeekDay";
import populateMonth from "./algorithms";

const Month = ({ month, year }) => {
	// query all events for the loggedin user for the given month and year

	// first day of the week for that month
	const weeks = populateMonth(month, year);
	//import Month enum from backend
	return (
		<div className="Month">
			<header>
				<h1>{`${MonthEnum[month]}, ${year}`}</h1>
			</header>
			{weeks.map((week, ind) => {
				return (
					<div className="week" key = {ind}>
						{week.map((day, index) => {
							return (
								<MiniDay
									key={index}
									events={day.events}
									day={day.day}
									month={month}
									year={year}
									weekDay={day.weekDay}
									monthStatus={day.monthStatus}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Month;
