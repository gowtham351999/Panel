import React from "react";

export const MainLayout = ({ children }) => {
  return (
    <div className="container-fluid" id="flow">
      <div className="row">
        <div className="col-12">{children}</div>
      </div>
    </div>
  );
};
