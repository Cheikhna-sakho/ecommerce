import React from "react";
import SummaryOrder from "./SummaryOrder";

const Layout = ({ children }) => {
 
  return (
    <div className="max-w-2xl mx-auto lg:max-w-none">
      <h1 className="sr-only">Checkout</h1>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>{children}</div>
        <SummaryOrder />
      </div>
    </div>
  );
};

export default Layout;
