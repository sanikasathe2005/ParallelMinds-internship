import {Card,CardContent,Box,Typography,Button} from "@mui/material";

type ProductItemProps = {
  product: {
    name: string;
    price: number;
  };
  index: number;
  deleteProduct: Function;
  editProduct:Function;
};

function ProductItem({
  product,
  index,
  deleteProduct,
  editProduct
}: ProductItemProps) {
  return (
    <Card className="product-card">

      <CardContent className="product-card-content">

        <Box>
          <Typography variant="h6" className="product-name">
            {product.name}
          </Typography>

          <Typography className="product-price">
            Rs{product.price}
          </Typography>
        </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button 
          variant="contained"
          color="warning"
          onClick={() => editProduct(index)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteProduct(index)}
        >
          Delete
        </Button>
    </Box>
        

      </CardContent>

    </Card>
  );
}

export default ProductItem;