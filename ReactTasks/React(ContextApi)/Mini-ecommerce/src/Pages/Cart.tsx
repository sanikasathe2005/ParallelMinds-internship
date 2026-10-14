
import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { CartContext } from "../Context/CartContext";

function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  return (
    <div className="page">
      <Typography variant="h4">Shopping Cart</Typography>

      {cartContext.cartItems.map((product) => (
        <div key={product.id}>
          <Typography>{product.title}</Typography>

          <Typography>Rs {product.price}</Typography>

          <Button
            color="error"
            onClick={() => cartContext.removeFromCart(product.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
