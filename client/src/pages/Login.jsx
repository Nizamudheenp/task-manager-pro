import { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = async () => {
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
