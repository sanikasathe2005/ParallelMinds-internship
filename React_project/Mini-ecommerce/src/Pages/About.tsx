import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

function About() {
  return (
    <Container className="page">
      <Typography variant="h4" className="title">
        About Us
      </Typography>

      <Typography variant="body1" className="description">
        Mini Shop is a simple e-commerce application built with React,
        TypeScript and Material UI.
      </Typography>
    </Container>
  );
}

export default About;