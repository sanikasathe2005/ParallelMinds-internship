
import { memo, useContext } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { id, title, price, category, thumbnail } = product;

  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    return null;
  }

  const { addToCart } = cartContext;

  return (
    <Card className="product-card">
      <CardContent className="product-content">
        <img src={thumbnail} alt={title} className="product-image" />

        <Typography className="product-title">
          {title}
        </Typography>

        <Typography className="product-category">
          Category: {category}
        </Typography>

        <Typography className="product-price">
          Rs {price}
        </Typography>

        <div className="product-buttons">
          <Button
            variant="contained"
            className="product-button"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </Button>

          <Button
            component={Link}
            to={`/products/${id}`}
            variant="contained"
            className="product-button"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default ProductCard;
