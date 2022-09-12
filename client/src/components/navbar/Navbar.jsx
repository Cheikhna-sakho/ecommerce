import { useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import Flyout from "./categories/Flyout";
import Mobile from "./Mobile";
import Users from "./Users";
import Logo from "./Logo";
import SearchBar from "./fonctionality/SearchBar";
import Home from "../../assets/home.png";
import { Link } from "react-router-dom";

const navigation = [
      [
        {
          name: "Un article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1602837385569-08ac19ec83af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ2l0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Un autre article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],

      [
        {
          name: "Un article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBoYXJkd2FyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Un autre article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
    

    [
        {
          name: "Un article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Un autre article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1579206630023-fe8d0520ba2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],        
    

    [
        {
          name: "Un article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1588473158757-afdb399558d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Un autre article",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1611572840901-43b748ac2e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29uZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
    ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-white z-50">
      {/* Mobile menu */}
      {/* <Mobile
        navigation={navigation}
        classNames={classNames}
        open={open}
        setOpen={setOpen}
      /> */}

      
        <div className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>

        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center justify-between w-full">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <RiMenu4Fill className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Flyout menus */}
              <Flyout navigation={navigation} classNames={classNames} />
              <Link to={"/"}>
                <img src={Home} style={{ width: 35, margin: "0px 20px"}} />
              </Link>

              {/* user action */}
              <Users />
            </div>
          </div>

          <SearchBar
            text={"lg:hidden flex items-center justify-center w-full my-5"}
          />
        </nav>
      </header>
    
  );
}
