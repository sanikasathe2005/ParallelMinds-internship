
import { useContext, useReducer } from "react";
import { Container, Button, Typography } from "@mui/material";
import { CartContext } from "../Context/CartContext";

function reducer(quantity: number, action: string) {
  if (action === "+") {
    return quantity + 1;
  }

  if (action === "-" && quantity > 1) {
    return quantity - 1;
  }

  return quantity;
}

function CartItem({
  product,
  onRemove,
}: {
  product: { id: number; title: string; price: number };
  onRemove: () => void;
}) {
  const [quantity, dispatch] = useReducer(reducer, 1);

  return (
    <div className="cart-item">
      <Typography className="cart-product-name">
        {product.title}
      </Typography>

      <Typography className="cart-price">
        Price: Rs {product.price}
      </Typography>

      <div className="cart-actions">
        <Button
          className="quantity-button"
          variant="outlined"
          disabled={quantity === 1}
          onClick={() => dispatch("-")}
        >
          -
        </Button>

        <Typography className="cart-quantity">
          {quantity}
        </Typography>

        <Button
          className="quantity-button"
          variant="outlined"
          onClick={() => dispatch("+")}
        >
          +
        </Button>

        <Button
          className="remove-button"
          variant="contained"
          color="error"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>

      <Typography className="cart-subtotal">
        Total: Rs {(product.price * quantity).toFixed(2)}
      </Typography>
    </div>
  );
}

function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  return (
    <Container className="page cart-page">
      <Typography variant="h4" className="title">
        Shopping Cart
      </Typography>

      {cartContext.cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <div className="cart-products">
          {cartContext.cartItems.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={() => cartContext.removeFromCart(product.id)}
            />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Cart;
