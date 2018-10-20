import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import Title from "./Title";
import PersonLink from "./PersonLink";
import ErrorDetails from "./ErrorDetails";

export const SearchQuery = gql`
  query SearchQuery($searchText: String!) {
    allPersons(
      filter: {
        name_contains: $searchText
        AND: { species_some: { name: "Human" } }
      }
    ) {
      id
      name
      gender
    }
  }
`;

class Search extends Component {
  state = {
    searchText: "",
    searchResults: [],
    searching: false,
    searchError: null
  };

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  async handleSearch(event) {
    event.preventDefault();

    const { searchText } = this.state;

    if (!searchText) {
      return;
    }

    try {
      this.setState({
        searching: true,
        searchError: null
      });

      const res = await this.props.client.query({
        query: SearchQuery,
        variables: { searchText }
      });

      this.setState({
        searching: false,
        searchResults: res.data.allPersons
      });
    } catch (err) {
      this.setState({
        searching: false,
        searchError: err
      });
    }
  }

  render() {
    return (
      <div className="search">
        <Title text="Search" />

        <form
          className="search-form mt3 mb3"
          onSubmit={event => this.handleSearch(event)}
        >
          <input
            type="text"
            name="searchText"
            className="search-form-field field block col-12"
            placeholder="🔎 Type any Star Wars human character name here..."
            value={this.state.searchText}
            onChange={event => this.handleChange(event)}
          />
          <button
            type="submit"
            className="search-form-btn btn btn-primary mt2"
            disabled={this.state.searching}
          >
            {this.state.searching ? "Searching..." : "Search"}
          </button>
        </form>

        {this.state.searchError ? (
          <ErrorDetails text="Oops! Something went wrong while searching for your query..." />
        ) : null}

        {this.state.searchResults.length ? (
          <div className="search-results">
            {this.state.searchResults.map(person => (
              <div key={person.id} className="search-results-link">
                <PersonLink person={person} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withApollo(Search);
