import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import Title from "./Title";
import Loading from "./Loading";
import ErrorDetails from "./ErrorDetails";
import RelatedPersons from "./RelatedPersons";
import emojis from "../utils/emojis";

export const PersonDetailsQuery = gql`
  query PersonDetailsQuery($personId: ID!) {
    Person(id: $personId) {
      id
      name
      gender
      films(orderBy: episodeId_ASC) {
        id
        title
        episodeId
        releaseDate
      }
    }
  }
`;

const PersonDetails = ({ data: { loading, error, Person } }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorDetails text="Oops! Something went wrong while requesting person details..." />
    );
  }

  return (
    <div className="person-details">
      <Title text={`${emojis.getByGender(Person.gender)} ${Person.name}`} />

      <ul className="person-details-films mt2">
        {Person.films.map(film => (
          <li key={film.id} className="person-details-film">
            <span>
              Episode {film.episodeId}: {film.title}{" "}
            </span>
            <i>({new Date(film.releaseDate).getFullYear()})</i>
          </li>
        ))}
      </ul>

      {Person.films.length >= 2 ? <RelatedPersons toPerson={Person} /> : null}
    </div>
  );
};

PersonDetails.propTypes = {
  id: PropTypes.string.isRequired
};

export default graphql(PersonDetailsQuery, {
  options: props => ({
    variables: { personId: props.id }
  })
})(PersonDetails);
