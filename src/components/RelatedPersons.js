import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import PersonLink from "./PersonLink";
import relatedPersonsUtil from "../utils/relatedPersons";

export const RelatedPersonsQuery = gql`
  query RelatedPersonsQuery($personId: ID!) {
    allPersons(
      filter: {
        id_not: $personId
        AND: [
          { species_some: { name: "Human" } }
          { films_some: { characters_some: { id: $personId } } }
        ]
      }
    ) {
      id
      name
      gender
      films(orderBy: episodeId_ASC) {
        id
        episodeId
      }
    }
  }
`;

const RelatedPersons = ({ relatedPersons }) => {
  if (relatedPersons.length) {
    return (
      <div className="related-persons mt3">
        <h6 className="caps">
          They appeared with this person in 2+ consecutive films:
        </h6>
        <div className="related-persons-list mt2">
          {relatedPersons.map(person => (
            <div key={person.id} className="related-persons-link">
              <PersonLink person={person} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

RelatedPersons.propTypes = {
  toPerson: PropTypes.object.isRequired
};

export default graphql(RelatedPersonsQuery, {
  options: props => ({
    variables: { personId: props.toPerson.id }
  }),
  props({ data: { allPersons }, ownProps: { toPerson } }) {
    let relatedPersons = [];

    if (allPersons && allPersons.length) {
      relatedPersons = relatedPersonsUtil(toPerson, allPersons);
    }

    return { relatedPersons };
  }
})(RelatedPersons);
