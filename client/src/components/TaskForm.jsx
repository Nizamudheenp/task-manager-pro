import { useState } from "react";
import { TextField, Button } from "@mui/material";
import api from "../api/axios";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");

  const createTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    onCreated(); 
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <TextField
        fullWidth
        label="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={createTask}
      >
        Add Task
      </Button>
    </div>
  );
}
