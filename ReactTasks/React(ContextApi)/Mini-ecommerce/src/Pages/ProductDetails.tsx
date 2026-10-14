
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../Api/productApi";
import useFetch from "../Hooks/useFetch";

interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<IProduct>(
    () => getProductById(id || "")
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (data === null) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Container className="page details-page">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="details-image"
      />

      <Typography variant="h4" className="title">
        {data.title}
      </Typography>

      <Typography className="details-category">
        Category: {data.category}
      </Typography>

      <Typography className="details-price">
        Rs {data.price}
      </Typography>

      <Typography className="description">
        {data.description}
      </Typography>

      <Button
        variant="contained"
        className="back-button"
        onClick={() => navigate("/products")}
      >
        Back to Products
      </Button>
    </Container>
  );
}

export default ProductDetails;
