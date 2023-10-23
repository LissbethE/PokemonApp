import React from "react";

const Btn = ({ children, onClick, classBtn }) => {
  return (
    <button className={classBtn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Btn;
