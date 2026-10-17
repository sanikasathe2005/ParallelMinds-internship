
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import ProductDetails from "../Pages/ProductDetails";
import Products from "../Pages/Products";
import Cart from "../Pages/Cart";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

function AppRoutes({ onLogin }: { onLogin: () => void }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Home /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />
        }
      />

      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
      />

      <Route
        path="/products"
        element={isLoggedIn ? <Products /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/products/:id"
        element={
          isLoggedIn ? <ProductDetails /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/about"
        element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/cart"
        element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
