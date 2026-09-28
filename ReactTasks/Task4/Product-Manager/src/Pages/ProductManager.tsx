import { useState } from "react";
import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";
import { Container, Box, Typography } from "@mui/material";

type Product = {
  name: string;
  price: number;
};

function ProductManager() {
  const storedProducts = localStorage.getItem("products");

  let productsData: Product[] = [];

  if (storedProducts) {
    productsData = JSON.parse(storedProducts);
  }

  const [products, setProducts] = useState(productsData);
  const [editIndex, setEditIndex] = useState(-1);

  function addProduct(name: string, price: number) {
    const newProducts = [
      ...products,
      {
        name: name,
        price: price
      }
    ];

    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  }

  function deleteProduct(index: number) {
    const newProducts = [...products];

    newProducts.splice(index, 1);

    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  }

  function editProduct(index: number) {
    setEditIndex(index);
  }

  function updateProduct(name: string, price: number) {
    const newProducts = [...products];

    newProducts[editIndex].name = name;
    newProducts[editIndex].price = price;

    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));

    setEditIndex(-1);
  }

  return (
    <Container maxWidth="md" className="page-container">
      <Box className="product-container">

        <Box className="heading">
          <Typography variant="h4">
            Product Manager
          </Typography>

          <Typography color="text.secondary">
            Add and manage your products
          </Typography>
        </Box>

        <ProductForm
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          editIndex={editIndex}
        />

        <Box className="products-section">

          <Box className="products-heading">
            <Typography variant="h5">
              Your Products
            </Typography>

            <Typography color="text.secondary">
              {products.length} products
            </Typography>
          </Box>

          <ProductList
            products={products}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
          />

        </Box>

      </Box>
    </Container>
  );
}

export default ProductManager;