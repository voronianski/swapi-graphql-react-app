import React from "react";
import { connect } from "react-redux";

import Title from "./Title";
import VisitedPersons from "./VisitedPersons";

export const History = ({ personIds }) => {
  return (
    <div className="history">
      <Title text="History" />

      <div className="mt3 mb3">
        <VisitedPersons ids={personIds} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  personIds: state.visitedPersons
});

export default connect(mapStateToProps)(History);
