import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h2 className="text-center">Email password authentication</h2>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
