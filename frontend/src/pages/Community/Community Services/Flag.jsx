import React from "react";

const Flag = ({ countryFlag, children }) => {
  return (
    <div className="flag" style={{ backgroundImage: `url(${countryFlag})` }}>
      {children}
    </div>
  );
};

export default Flag;
