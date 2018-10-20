import React from "react";
import PropTypes from "prop-types";

const ErrorDetails = ({ text }) => (
  <div className="error-details center">
    <img
      src="https://media.giphy.com/media/l2JJnE17UfKTwCb3G/giphy.gif"
      alt="crashing gif"
      className="error-details-image rounded"
      width="100%"
    />
    <div className="error-details-text h5 mt1 bold red">{text}</div>
  </div>
);

ErrorDetails.propTypes = {
  text: PropTypes.string
};

ErrorDetails.defaultProps = {
  text: "Error!"
};

export default ErrorDetails;
