
import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { ThemeContext } from "../Context/ThemeContext";

function Navbar() {
  const cartContext = useContext(CartContext);
  const themeContext = useContext(ThemeContext);

  if (themeContext === null) {
  return null;
}

  return (
    <nav className="navbar">
      <Typography variant="h5" className="logo">
        Mini Shop
      </Typography>

      <div className="links">
        <Button component={Link} to="/" sx={{ color: "white" }}>
          Home
        </Button>

        <Button component={Link} to="/products" sx={{ color: "white" }}>
          Products
        </Button>

        <Button component={Link} to="/about" sx={{ color: "white" }}>
          About
        </Button>

        <Button  sx={{ color: "white" }}>
          Cart ({cartContext!.cartCount})
        </Button>

        <Button onClick={themeContext.toggleTheme} sx={{ color: "white" }}>
        {themeContext.theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
