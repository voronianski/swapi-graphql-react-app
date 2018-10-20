import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import qs from "querystring";

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
  constructor(props) {
    super();

    const query = qs.parse(props.location.search.slice(1));

    this.state = {
      searchText: query.text || "",
      searchResults: [],
      searching: false,
      searchError: null
    };
  }

  componentDidMount() {
    this.executeSearch();
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSearch(event) {
    event.preventDefault();
    this.executeSearch();
  }

  handleClearSearch() {
    this.setState({
      searchText: "",
      searchResults: []
    });
    this.props.history.push({
      pathname: this.props.match.path
    });
  }

  async executeSearch() {
    const { searchText, searching } = this.state;

    if (!searchText || searching) {
      return;
    }

    try {
      this.setState({
        searching: true,
        searchError: null
      });

      const { data } = await this.props.client.query({
        query: SearchQuery,
        variables: { searchText }
      });

      this.setState({
        searching: false,
        searchResults: data.allPersons
      });
      this.props.history.push({
        pathname: this.props.match.path,
        search: `?text=${searchText}`
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
          {this.state.searchText ? (
            <button
              type="button"
              className="search-form-clear-btn btn btn-outline blue mt2 ml2"
              onClick={() => this.handleClearSearch()}
              disabled={this.state.searching}
            >
              Clear
            </button>
          ) : null}
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
