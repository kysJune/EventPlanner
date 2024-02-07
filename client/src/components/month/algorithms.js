import { WeekDay, getDay, numDaysInMonth } from "../../../../server/utils/CalculateWeekDay";

const populateMonth = (month, year) => {
	const firstWeekDay = getDay(1, month, year);
	
	const numDaysCurr = numDaysInMonth(month, year);
	const numDaysPrev = numDaysInMonth(
		month - 1 < 0 ? 11 : month - 1,
		month - 1 < 0 ? year - 1 : year
	);
	const weeks = [];
	const numWeeks = 6;
	const daysOfLastMonth = [];
	for (let i = numDaysPrev - firstWeekDay + 1; i <= numDaysPrev; i++) {
		daysOfLastMonth.push({
			events: [
				{
					name: "Rocket League",
					start: 0,
					end: 24
				}
			],
			day: i,
			weekDay: WeekDay[i - numDaysPrev + firstWeekDay - 1],
			monthStatus: "prev"
		});
	}
	//complete the first week with days of the current month
	for (let i = 1; i <= 7 - firstWeekDay; i++) {
		daysOfLastMonth.push({
			events: [
				{
					name: "Rocket League",
					start: 0,
					end: 24
				}
			],
			day: i,
			weekDay: WeekDay[firstWeekDay + i - 1],
			monthStatus: "curr"
		});
	}
	weeks.push(daysOfLastMonth);
    //fill the rest of the month
	loop1: for (let week = 1; week < numWeeks; week++) {
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
				day: week * 7 + i + 1 - firstWeekDay,
				weekDay: "",
				monthStatus: "curr"
			});
            if (week * 7 + i + 1 - firstWeekDay === numDaysCurr) {
                weeks.push(days);
                break loop1;
            }
		}

		weeks.push(days);
	}
    //fill the remaining days with the next month
    if ( weeks[weeks.length - 1].length < 7 ) {
        let stoppingCondition =  7 - weeks[weeks.length - 1].length;
        for(let i = 1; i <= stoppingCondition; i++) {
            weeks[weeks.length - 1].push({
                events: [
                    {
                        name: "Rocket League",
                        start: 0,
                        end: 24
                    }
                ],
                day: i,
                weekDay: "",
                monthStatus: "next"
            });
        }
    }
	return weeks;
};

export default populateMonth;
