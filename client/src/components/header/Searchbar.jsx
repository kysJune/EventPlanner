import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { getDateFromSearch } from "./algorithms/algorithms";


const Searchbar = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearchByDate, setIsSearchByDate] = useState(false);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchCriteriaChange = (event) => {
		setIsSearchByDate(event.target.value === "date");
		setSearchTerm("");
	};

	const handleSubmit = async () => {
		if (isSearchByDate) {
			const { year, month, day } = getDateFromSearch(searchTerm);
			navigate("/Day", { state: { year: Number(year), month: (Number(month)-1), day: Number(day) } });
		} else {
			//search by event
			navigate(`/searchResults?searchTerm=${searchTerm}`);
		}

	};

	return (
		<div className="Searchbar" onSubmit={handleSubmit}>
			<select name="searchCriteria" id="searchCriteria" onChange={handleSearchCriteriaChange}>
				<option value="event">Event</option>
				<option value="date">Date</option>
			</select>
			{!isSearchByDate ? (
				<input
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder={`Enter a ${isSearchByDate ? null : "Event"}`}
				/>
			) : (
				<input type="date" value={searchTerm} onChange={handleSearchChange} />
			)}
			<button className="search-button" onClick={handleSubmit}>
				<i className="fa fa-search" aria-hidden="true"></i>
			</button>
		</div>
	);
};

export default Searchbar;
