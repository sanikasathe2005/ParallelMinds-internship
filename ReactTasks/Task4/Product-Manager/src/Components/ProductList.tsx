import { Box } from "@mui/material";
import ProductItem from "./ProductItem";

type ProductListProps = {
  products: {
    name: string;
    price: number;
  }[];
  deleteProduct: Function;
  editProduct: Function;
};

function ProductList({
  products,
  deleteProduct,
  editProduct
}: ProductListProps) {
  return (
    <Box>
      {products.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          index={index}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      ))}
    </Box>
  );
}

export default ProductList;