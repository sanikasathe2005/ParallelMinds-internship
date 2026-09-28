import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

type Product = {
  name: string;
  price: number;
};

type ProductFormProps = {
  addProduct: Function;
  updateProduct: Function;
  editIndex: number;
  products: Product[];
};

function ProductForm({
  addProduct,
  updateProduct,
  editIndex,
  products
}: ProductFormProps) {
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  let buttonText = "Add Product";

  if (editIndex !== -1) {
    buttonText = "Update Product";
  }

  useEffect(() => {
    if (editIndex !== -1) {
      setName(products[editIndex].name);
      setPrice(String(products[editIndex].price));
    }
  }, [editIndex]);

  function handleAdd() {
    if (name === "" || price === "") {
      return;
    }

    if (editIndex === -1) {
      addProduct(name, Number(price));
    } else {
      updateProduct(name, Number(price));
    }

    setName("");
    setPrice("");
  }

  return (
    <Box className="form-section">

      <Typography variant="h6" className="form-title">
        Add New Product
      </Typography>

      <Box className="product-form">

        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button
          variant="contained"
          color="warning"
          onClick={handleAdd}
        >
          {buttonText}
        </Button>

      </Box>
    </Box>
  );
}

export default ProductForm;