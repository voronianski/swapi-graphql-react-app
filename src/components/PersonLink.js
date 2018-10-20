import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import emojis from "../utils/emojis";

const PersonLink = ({ person }) => (
  <div className="person-link bg-darken-1 relative py1 px2 mb2 rounded">
    <span className="person-link-emoji">
      {emojis.getByGender(person.gender)}{" "}
    </span>
    <Link to={`/person/${person.id}`} className="h5 caps bold purple">
      {person.name}
    </Link>
  </div>
);

PersonLink.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired
  })
};

export default PersonLink;
