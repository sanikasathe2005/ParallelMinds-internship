
import { CartProvider } from "./Context/CartContext";
import { ThemeProvider } from "./Context/ThemeContext";
import AppContent from "./Components/AppContent";

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
