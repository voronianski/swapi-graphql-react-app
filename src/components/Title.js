import React from "react";
import PropTypes from "prop-types";

const Title = ({ text }) => (
  <div className="title">
    <h2 className="title-text caps mt2">{text}</h2>
    <hr className="title-line mt1 mb1 b2 border-silver" />
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default Title;
