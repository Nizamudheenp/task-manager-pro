import { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </Box>
  );
}
