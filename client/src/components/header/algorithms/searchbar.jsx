import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //TODO implement searching of events
    console.log('Search Term:', this.state.searchTerm);
  }

  render() {
    return (
      <form className="searchbar" onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.searchTerm} 
          onChange={this.handleChange} 
          placeholder="Enter a Date or Event" 
        />
        <button className="button" onClick="handleSubmit">GO!</button>
      </form>
    );
  }
}

export default SearchBar;
