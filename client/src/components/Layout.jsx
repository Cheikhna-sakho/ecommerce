import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const roles = {
  user: "ROLE_USER",
};

const Layout = () => {
  return (
    
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
      <Outlet />
      </main>
    </>
  );
};

export default Layout;
