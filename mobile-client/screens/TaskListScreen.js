import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  TextInput,
  RefreshControl,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axios";
import TaskItem from "../components/TaskItem";

const LIMIT = 5;

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () => {
    setRefreshing(true);
    const res = await api.get("/tasks", {
      params: { search, status, page, limit: LIMIT },
    });
    setTasks(res.data.tasks);
    setTotal(res.data.total);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [page, status, search])
  );


  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Create Task"
          onPress={() => navigation.navigate("CreateTask")}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button title="Logout" onPress={logout} />
      </View>

      <TextInput
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          gap: 8,
        }}
      >
        <Button title="All" onPress={() => setStatus("")} />
        <Button title="Pending" onPress={() => setStatus("pending")} />
        <Button title="Completed" onPress={() => setStatus("completed")} />
        <Button title="Apply" onPress={() => { setPage(1); loadTasks(); }} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem task={item} reload={loadTasks} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadTasks} />
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button
          title="Prev"
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        />
        <Text>
          Page {page} / {totalPages}
        </Text>
        <Button
          title="Next"
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
        />
      </View>
    </View>
  );
}
