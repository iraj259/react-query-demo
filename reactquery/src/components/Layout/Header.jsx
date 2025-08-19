import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiDatabase } from "react-icons/fi";

const Header = () => {
  const links = [
    { name: "Home", to: "/", icon: <FiHome /> },
    { name: "Trad", to: "/trad", icon: <FiDatabase /> },
    { name: "RQ", to: "/rq", icon: <FiFileText /> },
  ];

  return (
    <header className="bg-gradient-to-r from-[#F6FFF8] to-[#EAF4F4] shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 sm:px-12">
        {/* Logo */}
        <div className="font-serif text-2xl md:text-3xl font-extrabold text-[#6B9080] tracking-tight">
          MyApp
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-1 text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#6B9080] scale-105 underline underline-offset-4"
                    : "text-gray-600 hover:text-[#6B9080] hover:scale-105"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
