import React, { Component } from "react";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.css";

class Searchbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ""
		};
	}

	handleChange = (event) => {
		this.setState({
			searchTerm: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		//TODO implement searching of events
		console.log("Search Term:", this.state.searchTerm);
	};

	render() {
		return (
			<form className="Searchbar" onSubmit={this.handleSubmit}>
				<input
					type="text"
					value={this.state.searchTerm}
					onChange={this.handleChange}
					placeholder="Enter a Date or Event"
				/>
				<button className="search-button" onClick="handleSubmit">
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
			</form>
		);
	}
}

export default Searchbar;
