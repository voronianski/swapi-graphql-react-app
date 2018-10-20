import React from "react";
import { connect } from "react-redux";

import PersonDetails from "./PersonDetails";
import { addVisitedPerson } from "../store/actions";

export const Person = ({ match, addVisitedPerson }) => {
  const personId = match.params.id;

  addVisitedPerson(personId);

  return (
    <div className="person">
      <PersonDetails id={personId} />
    </div>
  );
};

export default connect(
  null,
  { addVisitedPerson }
)(Person);
