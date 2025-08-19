import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#F6FFF8] to-[#EAF4F4] text-gray-700 py-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto text-center text-sm md:text-base font-sans">
        &copy; {new Date().getFullYear()} ReactQuery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
