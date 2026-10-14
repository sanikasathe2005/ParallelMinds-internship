
import { useState, useContext, useMemo, useEffect, useRef, useReducer } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductCard from "../Components/ProductCard";
import { CartContext } from "../Context/CartContext";
import useFetch from "../Hooks/useFetch";
import { getProducts } from "../Api/productApi";

interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

//useReducer function
function reducer(quantity: number, action: string) {
  if (action === "+") 
    {
      return quantity + 1;
    }
  if (action === "-" && quantity > 1) 
    {
      return quantity - 1;
    }
  return quantity;
}

//cart component 
function CartProduct({
  product,
  onRemove,
}: {
  product: { id: number; title: string; price: number };
  onRemove: () => void;
}) {
  const [quantity, dispatch] = useReducer(reducer, 1);

  return (
   <div className="cart-item">
  <Typography>{product.title}</Typography>

  <Typography>Price: Rs {product.price}</Typography>

  <Button onClick={() => dispatch("-")}>-</Button>
  {quantity}
  <Button onClick={() => dispatch("+")}>+</Button>

  <Typography>Total: Rs {product.price * quantity}</Typography>

  <Button color="error" onClick={onRemove}>
    Remove
  </Button>
</div>
  );
}

function Products() {
  const { data, loading, error } = useFetch<IProduct[]>(getProducts);
  const products = data || [];

//useState
  const [page, setPage] = useState(1);
  const perPage = 9;

  const [search, setSearch] = useState("");

//useRef
  const bottomRef = useRef<HTMLDivElement>(null);

//useContext
  const cartContext = useContext(CartContext);
 

//useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const start = (page - 1) * perPage;

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, start]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  useEffect(() => {
    setPage(1);
  }, [search]);

  //useRef function
  function scrollToBottom() {
    if (bottomRef.current !== null) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (cartContext === null) {
    return null;
  }

  return (
    <>
      <Container className="page products-page">
        <Typography variant="h4" className="title">
          Products
        </Typography>

        <Typography className="desc">
          Explore our available products and find something you like.
        </Typography>

        <TextField
          label="Search Products"
          sx={{ marginBottom: 4 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <div className="product-list">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Typography>No products found.</Typography>
        )}

        {filteredProducts.length > 0 && (
          <div className="pagination">
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <Typography>
              Page {page} of {totalPages}
            </Typography>

            <Button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Container>

      <Container className="cart-section">
        <Typography variant="h4" className="title">
          Shopping Cart
        </Typography>

        {cartContext.cartItems.map((product) => (
          <CartProduct
            key={product.id}
            product={product}
            onRemove={() => cartContext.removeFromCart(product.id)}
          />
        ))}
      </Container>

      <div ref={bottomRef}></div>

      <Button
        onClick={scrollToBottom}
        variant="contained"
        sx={{
          position: "fixed",
          top: "600px",
          right: "15px",
          minWidth: 35,
          borderRadius: "50%",
        }}
      >
        <KeyboardArrowDownIcon />
      </Button>
    </>
  );
}

export default Products;
