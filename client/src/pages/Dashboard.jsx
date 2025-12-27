import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import { TextField, Button } from "@mui/material";
import TaskCard from "../components/Taskcard";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");

    const loadTasks = async () => {
        const res = await api.get(`/tasks?search=${search}`);
        setTasks(res.data.tasks || res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}>
            <TaskForm onCreated={loadTasks} />

            <TextField
                fullWidth
                placeholder="Search tasks"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={loadTasks}>Search</Button>
            {tasks.length === 0 && <p>No tasks found</p>}

            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} reload={loadTasks} />
            ))}
        </div>
    );
}
