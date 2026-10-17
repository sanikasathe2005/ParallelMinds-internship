import { useState, useContext, useMemo, useEffect } from "react";
import {Container,Typography,Button,TextField,MenuItem} from "@mui/material";
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

function Products() {
  const { data, loading, error } = useFetch<IProduct[]>(getProducts);
  const products = data || [];

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const perPage = 9;

  const cartContext = useContext(CartContext);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || product.category === category)
      );
    });
  }, [products, search, category]);

  const start = (page - 1) * perPage;

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, start]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

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
    <Container className="page products-page">
      <Typography variant="h4" className="title">
        Products
      </Typography>

      <Typography className="desc">
        Explore our available products and find something you like.
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "16px",
          marginBottom: "32px",
          width: "100%",
        }}
      >
        <div style={{ flex: 3 }}>
          <TextField
            label="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </div>

        <div style={{ flex: 1 }}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Categories</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

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
  );
}

export default Products;