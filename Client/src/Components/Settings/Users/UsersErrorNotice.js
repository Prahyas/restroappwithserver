import React from "react";

const UsersErrorNotice = ({ message, clearError }) => {
  return (
    <div className="error-notice">
      <span>
        <small>{message}</small>
      </span>
      <button onClick={clearError}>x</button>
    </div>
  );
};

export default UsersErrorNotice;
