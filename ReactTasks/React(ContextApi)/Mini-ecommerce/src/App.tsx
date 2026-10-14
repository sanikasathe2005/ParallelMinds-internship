
import { useContext } from "react";
import { CartProvider } from "./Context/CartContext";
import { ThemeContext, ThemeProvider } from "./Context/ThemeContext";
import Navbar from "./Components/Navbar";
import AppRoutes from "./Routes/AppRoutes";

function AppContent() {
  const themeContext = useContext(ThemeContext);

  if (themeContext === null) {
    return null;
  }

  let className = "app light";

  if (themeContext.theme === "dark") {
    className = "app dark";
  }

  return (
    <div className={className}>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;
