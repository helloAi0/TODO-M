import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { getRandomQuote } from "./components/quotes";


export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [now, setNow] = useState(Date.now());
  const [dueAt, setDueAt] = useState("");
  const [darkMode, setDarkMode] = useState(false);





  useEffect(() => {
    try {
      const todoString = localStorage.getItem("todos");

      if (todoString && todoString !== "undefined") {
        const parsed = JSON.parse(todoString).map(t => ({
          ...t,
          createdAt: t.createdAt || Date.now(),
          completedAt: t.completedAt || null,
          paused: t.paused || false,
          pausedAt: t.pausedAt || null,
          totalPausedTime: t.totalPausedTime || 0,
          dueAt: t.dueAt || null
        }));

        setTodos(parsed);
      }

      const savedBg = localStorage.getItem("bgImage");
      if (savedBg) setBgImage(savedBg);

    } catch (err) {
      console.error("Invalid todos in localStorage");
      localStorage.removeItem("todos");
    }

    const savedDark = localStorage.getItem("darkMode");
    if (savedDark) setDarkMode(JSON.parse(savedDark));

  }, []);


  useEffect(() => {
    if (bgImage) {
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    }
  }, [bgImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000); // updates every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);


  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 6000);

    return () => clearInterval(interval);
  }, []);





  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(params));
  }



  const handleEdit = (e, id) => {
    const t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveToLS(newTodos);
  }
  const handleRemove = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveToLS(newTodos);
  }
  const handleSave = () => {
    if (todo.trim() === "") {
      setError("Add todos to save...");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      todo,
      isCompleted: false,
      createdAt: Date.now(),
      completedAt: null,
      paused: false,
      pausedAt: null,
      totalPausedTime: 0,
      dueAt: dueAt ? new Date(dueAt).getTime() : null,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveToLS(newTodos);

    setTodo("");
    setDueAt("");
    setError("");
  };



  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);

    const newTodos = [...todos];
    const todoItem = newTodos[index];

    todoItem.isCompleted = !todoItem.isCompleted;

    // set completion time
    if (todoItem.isCompleted) {
      todoItem.completedAt = Date.now();
    } else {
      todoItem.completedAt = null;
    }

    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handlePauseResume = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t.id === id);
    const todo = newTodos[index];

    if (todo.isCompleted) return;

    if (!todo.paused) {
      todo.paused = true;
      todo.pausedAt = Date.now();
    } else {
      todo.paused = false;
      todo.totalPausedTime += Date.now() - todo.pausedAt;
      todo.pausedAt = null;
    }

    setTodos(newTodos);
    saveToLS(newTodos);
  };



  const handleBgChange = () => {
    const url = prompt("Enter background image URL (leave empty to reset):");

    if (!url) {
      setBgImage("");
      localStorage.removeItem("bgImage");
      document.body.style.backgroundImage = "none";
      return;
    }

    setBgImage(url);
    localStorage.setItem("bgImage", url);
  };


  const getTimeTaken = (todo, endTime) => {
    if (!todo.createdAt) return "0m";

    let end = endTime || now;
    let pausedTime = todo.totalPausedTime || 0;

    if (todo.paused && todo.pausedAt) {
      pausedTime += now - todo.pausedAt;
    }

    const diff = Math.max(0, end - todo.createdAt - pausedTime);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };


  const getDueCountdown = (dueAt) => {
    if (!dueAt) return null;

    const diff = dueAt - now;
    if (diff <= 0) return "⛔ Overdue";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `⏳ ${hours}h ${minutes}m left`;
  };

  const getTodayTimeSpent = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let total = 0;

    todos.forEach(todo => {
      if (todo.completedAt && todo.completedAt >= startOfDay.getTime()) {
        total += todo.completedAt - todo.createdAt - todo.totalPausedTime;
      }
    });

    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total / (1000 * 60)) % 60);

    return `${hours}h ${minutes}m`;
  };



  return (
    <>
      <div className="min-h-screen bg-transparent">




        <Navbar />
        <div className="h-16"></div>
        <div className="max-w-3xl mx-auto my-6 sm:my-10 rounded-2xl p-4 sm:p-6 bg-white/30 dark:bg-gray-900/40 dark:text-white backdrop-blur-sm shadow-2xl min-h-[80vh] relative border border-white/20 dark:border-gray-700/30">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={handleBgChange}
            className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black"
          >
            Change Background
          </button>

          <div className="my-6">
            <div className="font-bold text-sm text-gray-900 dark:text-gray-300 mb-3">
              📊 Time spent today: <b>{getTodayTimeSpent()}</b>
            </div>

            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Add a Todo</h2>

            <div className=" text-center py-2 mb-4">
              <span className="font-bold text-xl font-medium text-gray-900 dark:text-gray-300 italic transition-all duration-500">
                {quote}
              </span>
            </div>


            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Write your task..."
                className="flex-1 px-4 py-3 rounded-xl border bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="datetime-local"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
                className="px-4 py-2 rounded-xl border  bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />



              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
              >
                Save
              </button>
            </div>

            {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
          </div>

          <h2 className='text-xl font-semibold my-6 text-gray-900 dark:text-white'>Your Todos</h2>
          <div className='todos '>
            {todos.length === 0 && <div className='text-center text-gray-500 dark:text-gray-400 py-10 font-medium'>No todos yet. Add your first task!</div>}
            {todos.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-4 mb-3 rounded-xl bg-white/15 hover:bg-white/25 dark:bg-gray-800/25 dark:hover:bg-gray-700/35 backdrop-blur-[2px] border border-white/10 dark:border-gray-700/20 transition"
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckbox}
                  name={item.id}
                  className="w-5 h-5 accent-violet-600"
                />

                <div className="flex-1">
                  <div className={`text-base ${item.isCompleted ? "line-through text-gray-500" : ""}`}>
                    {item.todo}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    ⏱ {item.isCompleted
                      ? `Completed in ${getTimeTaken(item, item.completedAt)}`
                      : `Running: ${getTimeTaken(item, now)}`}
                  </div>

                  <div className="text-xs text-gray-500">
                    Efficiency:{" "}
                    {item.isCompleted && item.completedAt > item.createdAt
                      ? Math.max(
                        0,
                        Math.round(
                          ((item.completedAt - item.createdAt - item.totalPausedTime) /
                            Math.max(1, item.completedAt - item.createdAt)) * 100
                        )
                      ) + "%"
                      : "—"}



                  </div>


                  {item.dueAt && (
                    <div className="text-xs text-orange-600 mt-1">
                      {getDueCountdown(item.dueAt)}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePauseResume(item.id)}
                    className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    {item.paused ? "▶" : "⏸"}
                  </button>

                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={(e) => handleRemove(e, item.id)}
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}


          </div>

        </div>

      </div>
    </>
  );
}

