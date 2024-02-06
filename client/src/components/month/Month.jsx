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
							let monthProp = month;
							if(day.monthStatus === "prev"){
								monthProp = (month - 1) < 0 ? 11 : month - 1;
							}
							else if (day.monthStatus === "next"){
								monthProp = (month + 1) > 11 ? 0 : month + 1;
							}
							return (
								<MiniDay
									key={index}
									events={day.events}
									day={day.day}
									month={monthProp}
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
