import { Card, CardContent, Typography, Button } from "@mui/material";
import api from "../api/axios";

export default function TaskCard({ task, reload }) {
  const toggleStatus = async () => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    reload();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    reload();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="text.secondary">
          Status: {task.status}
        </Typography>

        <Button onClick={toggleStatus}>
          Mark {task.status === "pending" ? "Completed" : "Pending"}
        </Button>

        <Button color="error" onClick={deleteTask}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
