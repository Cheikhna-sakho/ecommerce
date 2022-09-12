import { useState, useEffect } from "react";
import {
  BsPlus,
  BsSearch,
  BsEyeFill,
  BsBookmarkFill,
  BsFillArrowLeftSquareFill,
  BsPeopleFill,
  BsTerminalFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import { AiFillFire, AiFillMessage } from "react-icons/ai";
import { IoMdArrowRoundUp } from "react-icons/io";
import { MdNightlightRound, MdFeedback } from "react-icons/md";
import { FaCog } from "react-icons/fa";

import { motion, useAnimation } from "framer-motion";
import { NavLink } from "react-router-dom";

const data = [
  {
    name: "Produits",
    items: [
      {
        title: "Popular",
        icon: AiFillFire,
      },
      {
        title: "Most Upvoted",
        icon: IoMdArrowRoundUp,
      },
      {
        title: "Best Discussions",
        icon: AiFillMessage,
      },
      {
        title: "Search",
        icon: BsSearch,
      },
    ],
  },
  {
    name: "Utilisateur",
    items: [
      {
        title: "Bookmarks",
        icon: BsBookmarkFill,
      },
      {
        title: "Reading history",
        icon: BsEyeFill,
      },
      {
        title: "Focus Mode",
        icon: MdNightlightRound,
      },
      {
        title: "Customize",
        icon: FaCog,
      },
    ],
  },
];

const datafooter = [
  {
    name: "",
    items: [
      {
        title: "Docs",
        icon: BsBookmarkFill,
      },
      {
        title: "Changelog",
        icon: BsTerminalFill,
      },
      {
        title: "Feedback",
        icon: MdFeedback,
      },
      {
        title: "Invite people",
        icon: BsPeopleFill,
      },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState(false);
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const showMore = () => {
    controls.start({
      width: "250px",
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: "block",
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: "55px",
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: "none",
    });

    controlTitleText.start({
      opacity: 0,
    });

    setActive(false);
  };

  useEffect(() => {
    showMore();
  }, []);

  return (
    
    <div className="min-h-screen bg-black">
     
      <motion.div
        animate={controls}
        className="max-w-[250px]  animate duration-300 border-r border-gray-700 relative flex flex-col py-10 min-h-screen group"
      >
        {active && (
          <BsFillArrowLeftSquareFill
            onClick={showLess}
            className="absolute hidden text-2xl text-white cursor-pointer -right-4 top-10 group-hover:block "
          />
        )}
        {!active && (
          <BsFillArrowRightSquareFill
            onClick={showMore}
            className="absolute text-2xl text-white cursor-pointer -right-4 top-10"
          />
        )}

        
        <div className="grow">
          {data.map((group, index) => (
            <div key={index} className="my-2">
              <motion.p
                animate={controlTitleText}
                className="mb-2 ml-4 text-sm font-bold text-gray-500"
              >
                {group.name}
              </motion.p>

              {group.items.map((item, index2) => (
                <div key={index2} className="flex px-4 py-1 cursor-pointer">
                      <item.icon className="text-lg text-gray-500" />
    
                      <motion.NavLink
                    to="/produit"
                    animate={controlText}
                    className="ml-4 text-sm font-bold text-gray-400"
                  >
                    {" "}
                    {item.title}
                  </motion.NavLink>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          {datafooter.map((group, index) => (
            <div key={index} className="my-2">
              <motion.p
                animate={controlTitleText}
                className="mb-2 ml-4 text-sm font-bold text-gray-500"
              >
                {group.name}
              </motion.p>

              {group.items.map((item, index2) => (
                <div key={index2} className="flex px-4 py-1 cursor-pointer">
                  <item.icon className="text-lg text-gray-500" />
                  <motion.p
                    animate={controlText}
                    className="ml-4 text-sm font-bold text-gray-400"
                  >
                    {" "}
                    {item.title}
                  </motion.p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
