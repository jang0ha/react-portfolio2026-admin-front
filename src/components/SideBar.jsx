import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/asset";
const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: assets.dashboardIcon },
    { name: "Add Projects", path: "/projects/register", icon: assets.addIcon },
    { name: "List Projects", path: "/projects/list", icon: assets.listIcon },
    {
      name: "Design System",
      path: "/design-system",
      icon: assets.designIcon,
    },
  ];
  return (
    <aside className="md:w-64 w-16 h-full text-sm pt-4 flex flex-col transition-all duration-300 sticky top-0">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3   ${isActive ? "border-r-4 md:border-r-[6px] bg-gray-500/10 border-black text-black-500" : "hover:bg-gray-100/90 border-white text-gray-700"}`
          }
        >
          <img src={item.icon} alt={item.name} className="min-h-6 min-w-6" />
          <p className="md:block hidden text-center"> {item.name}</p>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
