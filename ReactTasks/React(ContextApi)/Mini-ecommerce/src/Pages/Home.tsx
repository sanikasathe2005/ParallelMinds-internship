import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="home">
      <Typography variant="h2" className="title">
        Welcome to Mini Shop
      </Typography>

      <Typography variant="h6" className="subtitle">
        Discover products made for you
      </Typography>

      <Typography variant="body1" className="description">
        Explore our collection of products and find something you want .
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/products"
        className="button"
      >
        Explore Products
      </Button>
    </Container>
  );
}

export default Home;