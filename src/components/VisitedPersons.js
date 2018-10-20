import React from "react";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import Loading from "./Loading";
import PersonLink from "./PersonLink";
import ErrorDetails from "./ErrorDetails";

export const VisitedPersonsQuery = gql`
  query VisitedPersonsQuery($personIds: [ID!]) {
    allPersons(filter: { id_in: $personIds }) {
      id
      name
      gender
    }
  }
`;

const VisitedPersons = ({ ids, data: { loading, error, allPersons } }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorDetails text="Oops! Something went wrong while requesting visited persons..." />
    );
  }

  if (!allPersons || !allPersons.length) {
    return (
      <div className="visited-persons-empty">
        You did not visit any person yet...
      </div>
    );
  }

  return (
    <div className="visited-persons">
      {ids.map(id => {
        const person = allPersons.find(p => p.id === id);

        return (
          <div key={person.id} className="visited-persons-link">
            <PersonLink person={person} />
          </div>
        );
      })}
    </div>
  );
};

VisitedPersons.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default graphql(VisitedPersonsQuery, {
  options: props => ({
    variables: { personIds: [...props.ids] }
  })
})(VisitedPersons);
