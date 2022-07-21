import React from "react";
import { Link } from "react-router-dom";
import "./logo.scss";

const Logo = () => {
  return (
    <div className="text-center md:text-start text-md md:text-2xl font-bold mb-10">
      <Link to="/" className="text-red-800 hover:text-teal-900">
        inf101
      </Link>
    </div>
  );
};

export default Logo;
