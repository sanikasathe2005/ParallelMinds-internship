import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Navbar from "./Navbar";
import AppRoutes from "../Routes/AppRoutes";

function AppContent() {
  const themeContext = useContext(ThemeContext);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  if (themeContext === null) {
    return null;
  }

  let className = "app light";

  if (themeContext.theme === "dark") {
    className = "app dark";
  }

  return (
    <div className={className}>
      {isLoggedIn && (
        <Navbar onLogout={() => setIsLoggedIn(false)} />
      )}
      <AppRoutes onLogin={() => setIsLoggedIn(true)} />
    </div>
  );
}

export default AppContent;