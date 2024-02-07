import "./Month.css";
import MiniDay from "./MiniDay.jsx";
import { Month as MonthEnum } from "../../../../server/utils/CalculateWeekDay";
import populateMonth, { getCurrentMonth, getCurrentYear } from "./algorithms";
import { useLocation, useNavigate } from "react-router-dom";

const Month = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const month = location?.state?.month || 0; //bug when I try to set the month to getCurrentMonth() or any number other than 0
	//when on February the handlePrevMonthClick function does not work
	const year = location?.state?.year || getCurrentYear();
	// query all events for the loggedin user for the given month and year

	//weeks array contains all day objects to display for the given month
	const weeks = populateMonth(month, year);

	const handlePrevMonthClick = () => {
		navigate("/Month", {
			state: {
				year: Number(month) - 1 < 0 ? Number(year) - 1 : year,
				month: Number(month) - 1 < 0 ? 11 : Number(month) - 1
			}
		});
	};

	const handleNextMonthClick = () => {
		navigate("/Month", {
			state: {
				year: Number(month) + 1 > 11 ? Number(year) + 1 : year,
				month: Number(month) + 1 > 11 ? 0 : Number(month) + 1
			}
		});
	};

	return (
		<div className="Month">
			<header>
				<button className="month-control-button" onClick={handlePrevMonthClick}>
					{"<"}
				</button>
				<h1>{`${MonthEnum[month]}, ${year}`}</h1>
				<button className="month-control-button" onClick={handleNextMonthClick}>
					{">"}
				</button>
			</header>
			{weeks.map((week, ind) => {
				return (
					<div className="week" key={ind}>
						{week.map((day, index) => {
							let monthProp = month;
							// if the day is from the previous month set the month to the previous month
							if (day.monthStatus === "prev") {
								monthProp = month - 1 < 0 ? 11 : month - 1;
							}
							// if the day is from the next month set the month to the next month
							else if (day.monthStatus === "next") {
								monthProp = month + 1 > 11 ? 0 : month + 1;
							}

							let yearProp = year;
							// if the previous month is December (11) then set the year to the previous year
							if (monthProp === 11 && day.monthStatus === "prev") {
								yearProp = Number(year) - 1;
							}
							// if the next month is January (0) then set the year to the next year
							else if (monthProp === 0 && day.monthStatus === "next") {
								yearProp = Number(year) + 1;
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
