import React from 'react';

const Navbar = () => {
  return (
    <div> 
      <nav className='flex justify-between bg-amber-500 text-black py-2 items-center'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 cursor-pointer hover:text-green-600'>TODO-M</span>
        </div>
        <ul className='flex gap-5 mx-9'>
            <li className='text-lg cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='text-lg cursor-pointer hover:font-bold transition-all'>Your Mr.Tasks</li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar
