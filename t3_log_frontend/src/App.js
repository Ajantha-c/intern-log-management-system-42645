import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";

// PUBLIC_INTERFACE
function App() {
  /** Application root for the T3 Log frontend. */
  const [theme, setTheme] = useState("dark");

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <LoginPage />
    </div>
  );
}

export default App;
