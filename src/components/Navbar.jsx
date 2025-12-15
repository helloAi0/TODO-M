import React, { useEffect, useState } from 'react';

const quotes = [
  "Small steps every day lead to big results 🚀",
  "Your future self will thank you for starting today ✨",
  "Focus on progress, not perfection 💪",
  "One task at a time. You’ve got this ✔",
  "Discipline today creates freedom tomorrow 🔥",
  "Start now. Momentum will follow ⚡"
];

const Navbar = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="flex justify-between bg-amber-500 text-black py-2 items-center">
        <div className="logo">
          <span className="font-bold text-xl mx-8 cursor-pointer hover:text-green-600">
            TODO-M
          </span>
        </div>
        <ul className="flex gap-5 mx-9">
          <li className="text-lg cursor-pointer hover:font-bold transition-all">
            Home
          </li>
          <li className="text-lg cursor-pointer hover:font-bold transition-all">
            Your Mr.Tasks
          </li>
        </ul>
      </nav>

      {/* 🔽 Motivational Quote */}
      <div className="text-center py-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 italic transition-all duration-500">
          {quote}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
