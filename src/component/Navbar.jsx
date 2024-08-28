import { useReducer, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Navbar.module.css";

const initialState = {
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleDarkMode":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      throw new Error("Unknown action type");
  }
};

const Navbar = () => {
  const [{ darkMode }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== darkMode) {
      dispatch({ type: "toggleDarkMode", payload: savedMode });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch({ type: "toggleDarkMode" });
  };

  return (
    <nav className={styles.nav}>
      <h2>Where in the world?</h2>
      <div className={styles.mode} onClick={handleToggle}>
        {darkMode ? <FaSun /> : <FaMoon />}
        <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
      </div>
    </nav>
  );
};

export default Navbar;
