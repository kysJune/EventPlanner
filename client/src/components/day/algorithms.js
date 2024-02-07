const isValidEvent = (name, startTime, endTime) => {
	if (newEventName.length === 0 || newEventStartTime === "" || newEventEndTime === "") {
		alert("Please fill out all fields");
		return false;
	}
	if (
		newEventStartTime < 0 ||
		newEventStartTime > 24 ||
		newEventEndTime < 0 ||
		newEventEndTime > 24 ||
		newEventStartTime > newEventEndTime
	) {
		alert("Invalid time range");
		return false;
	}
	return true;
};

export default isValidEvent;
