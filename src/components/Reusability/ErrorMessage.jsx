import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <p>
      <span>⛔</span> {message}
    </p>
  );
};

export default ErrorMessage;
