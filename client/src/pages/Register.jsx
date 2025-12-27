import { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      toast.success("Registered successfully");
      window.location = "/";
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <TextField fullWidth label="Name" margin="normal"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField fullWidth label="Email" margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField fullWidth type="password" label="Password" margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button fullWidth variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>

    </Box>
  );
}
