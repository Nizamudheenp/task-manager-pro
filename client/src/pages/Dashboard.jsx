import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/Taskcard";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const LIMIT = 5;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

// get on parent
  const loadTasks = async () => {
    const res = await api.get("/tasks", {
      params: {
        search,
        status,
        page,
        limit: LIMIT,
      },
    });

    setTasks(res.data.tasks);
    setTotal(res.data.total);
  };

  useEffect(() => {
    loadTasks();
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 3 }}>
      <TaskForm onCreated={loadTasks} />

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <TextField
          fullWidth
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={status}
          displayEmpty
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={() => {
            setPage(1);
            loadTasks();
          }}
        >
          Apply
        </Button>
      </Box>

      {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} reload={loadTasks} />
      ))}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
