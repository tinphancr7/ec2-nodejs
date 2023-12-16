import {timeTypes} from "../constants/common";

const getBookingTime = (booking) => {
	const res = timeTypes.find((item) => item.label === booking);
	return res ? res.value : null;
};
export {getBookingTime};
