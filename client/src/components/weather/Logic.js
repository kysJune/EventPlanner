// TODO : Change terrible name
export const convertKelvinToFahrenheit = (kelvin) => {
	return Math.round((kelvin - 273.15) * 1.8 + 32);
};

export const getIcon = (iconCode) => {
	return `http://openweathermap.org/img/w/${iconCode}.png`;
};
