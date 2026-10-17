
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignup() {
    if (username === "" || password === "" || confirmPassword === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Successfully registered!");
    navigate("/login");
  }

  return (
    <div className="login-container">
      <Typography variant="h4">Sign Up</Typography>

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

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>

      <Typography color="error">{message}</Typography>

      <Typography>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
}

export default Signup;
