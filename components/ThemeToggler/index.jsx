// IMPORTING USE CONTEXT FROM REACT TO USE STORE
import { useContext, forwardRef } from "react";

// IMPORTING THEME CONTEXT FROM STORE
import ThemeContext from "context/ThemeContext";

// IMPORTING ICON
import { LightMode } from "@styled-icons/material/LightMode";
import { DarkMode } from "@styled-icons/material/DarkMode";

const ThemeToggler = (props) => {
  const { darkTheme, toggleDarkTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkTheme}
      className="flex items-center text-slate-700 dark:text-slate-300	 gap-1 hover:text-teal-500 rounded-md shadow-md p-2 bg-teal-50 dark:bg-teal-900"
      aria-label="Toggle Theme"
    >
      {darkTheme ? <DarkMode className="w-6" /> : <LightMode className="w-6" />}
    </button>
  );
};

export default ThemeToggler;
