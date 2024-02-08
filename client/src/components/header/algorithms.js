import { cookies } from "../../App.jsx";

export const removeCookies = () => {
	// Get all cookies
	const allCookies = cookies.getAll();

	// Iterate over all cookies and remove each one
	Object.keys(allCookies).forEach((cookieName) => {
		cookies.remove(cookieName);
	});
};
