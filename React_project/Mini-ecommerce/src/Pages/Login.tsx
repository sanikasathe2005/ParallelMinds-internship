
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin() {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
      localStorage.setItem("loggedIn", "true");
      onLogin();
      navigate("/");
    } else {
      setMessage("Please sign up first or check your details.");
    }
  }

  return (
    <div className="login-container">
      <Typography variant="h4">Login</Typography>

      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>

      <Typography color="error">{message}</Typography>

      <Typography>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </div>
  );
}

export default Login;
