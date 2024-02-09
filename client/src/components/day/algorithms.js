const isValidEvent = (newEventName, newEventStartTime, newEventEndTime) => {
	if (newEventName.length === 0 || newEventStartTime === "" || newEventEndTime === "") {
		alert("Please fill out all fields");
		return false;
	}
	const startTime = get24HourTime(newEventStartTime);
	const endTime = get24HourTime(newEventEndTime);
	console.log(startTime, endTime);
	if (startTime < 0 || startTime > 2459 || endTime < 0 || endTime > 2459 || startTime > endTime) {
		alert("Invalid time range");
		return false;
	}
	return true;
};

export const get24HourTime = (timeString) => {
	const [hours, minutes] = timeString.split(":");
	return parseInt(hours) * 100 + parseInt(minutes);
};

export const convert24HourToString = (time) => {
	let hours = Math.floor(time / 100) * 100;
	let minutes = time % 100;
	let result = "";
	let ampm = hours > 1100 ? "PM" : "AM";
	if (hours > 1100) {
		hours -= 1200;
	}
	if (hours === 0) {
		hours = 12;
	} else {
		hours /= 100;
	}
	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return `${hours}:${minutes} ${ampm}`;
};

export default isValidEvent;
