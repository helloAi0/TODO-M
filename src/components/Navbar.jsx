import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-orange-500 shadow-md h-10">
      <div className="flex items-center justify-between h-full px-6">
        <span className="font-bold text-lg cursor-pointer hover:text-green-600">
          TODO-M
        </span>
        <ul className="flex gap-5">
          <li className="text-sm cursor-pointer hover:font-bold transition-all">
            Home
          </li>
          <li className="text-sm cursor-pointer hover:font-bold transition-all">
            Your Mr.Tasks
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
