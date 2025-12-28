import { View, Text, Button } from "react-native";
import api from "../api/axios";

export default function TaskItem({ task, reload }) {
  const toggleStatus = async () => {
    if (task.status === "completed") return;

    await api.put(`/tasks/${task._id}`, {
      status: "completed",
    });
    reload();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    reload();
  };

  const isCompleted = task.status === "completed";

  return (
    <View
      style={{
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 6,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {task.title}
      </Text>

      <Text style={{ marginVertical: 6, color: "#666" }}>
        Status: {task.status}
      </Text>

      <View style={{ marginBottom: 6 }}>
        <Button
          title={isCompleted ? "Completed" : "Mark Completed"}
          onPress={toggleStatus}
          disabled={isCompleted}
        />
      </View>

      <Button title="Delete" color="red" onPress={deleteTask} />
    </View>
  );
}
