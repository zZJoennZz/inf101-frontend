import React from "react";
import { Link } from "react-router-dom";
import "./logo.scss";

const Logo = () => {
  return (
    <div className="text-center md:text-center text-md md:text-2xl font-bold mb-3 block">
      <Link to="/" className="text-white hover:text-gray-200">
        inf101
      </Link>
      <div className="text-sm text-white font-normal italic text-cyan-200">
        CHiS
      </div>
    </div>
  );
};

export default Logo;
