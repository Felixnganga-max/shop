import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
        <p className="w-full md:w-2/3 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          molestias recusandae, explicabo vel delectus facilis! Sunt voluptate
          dolorum molestiae asperiores.
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-2 text-gray-700">
          <li>Home</li>
          <li>Delivery</li>
          <li>About Us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-2 text-gray-700">
          <li>+254 758 294 3456</li>
          <li>forever@gmail.com</li>
        </ul>
      </div>

      {/* Copyright Section */}
      <div className="col-span-full text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
