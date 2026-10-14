import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="notfound">
      <Typography variant="h1" className="code">
        404
      </Typography>

      <Typography variant="h4" className="title">
        Page Not Found
      </Typography>

      <Typography variant="body1" className="desc">
        Page not exists.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        className="button"
      >
        Back to Home
      </Button>
    </Container>
  );
}

export default NotFound;