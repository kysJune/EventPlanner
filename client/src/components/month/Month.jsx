import "./Month.css";
import MiniDay from "./MiniDay.jsx";
import {
	Month as MonthEnum,
} from "../../../../server/utils/CalculateWeekDay";
import populateMonth from "./algorithms";

const Month = ({ month, year }) => {
	// query all events for the loggedin user for the given month and year

	//weeks array contains all day objects to display for the given month 
	const weeks = populateMonth(month, year);

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
							// if the day is from the previous month set the month to the previous month
							if(day.monthStatus === "prev"){
								monthProp = (month - 1) < 0 ? 11 : month - 1;
							}
							// if the day is from the next month set the month to the next month
							else if (day.monthStatus === "next"){
								monthProp = (month + 1) > 11 ? 0 : month + 1;
							}

							let yearProp = year;
							// if the previous month is December (11) then set the year to the previous year
							if(monthProp === 11 && day.monthStatus === "prev"){
								yearProp = year - 1;
							}
							// if the next month is January (0) then set the year to the next year
							else if(monthProp === 0 && day.monthStatus === "next"){
								yearProp = year + 1;
							}
							return (
								<MiniDay
									key={index}
									events={day.events}
									day={day.day}
									month={monthProp}
									year={yearProp}
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
