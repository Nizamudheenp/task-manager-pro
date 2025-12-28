import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import api from "../api/axios";

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const createTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <TextInput
        placeholder="Task title"
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 6,
          marginBottom: 12,
        }}
      />
      <Button title="Create Task" onPress={createTask} />
    </View>
  );
}
