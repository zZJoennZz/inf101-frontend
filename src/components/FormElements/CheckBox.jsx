import React from "react";

const CheckBox = ({ inputLabel, ...rest }) => {
  return (
    <div style={{ marginRight: "0.5rem" }}>
      <input type="checkbox" {...rest} /> {inputLabel}
    </div>
  );
};

export default CheckBox;
