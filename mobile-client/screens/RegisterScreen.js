import { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import api from "../api/axios";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const register = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }

    try {
      await api.post("/auth/register", form);
      navigation.replace("Login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      {["Name", "Email", "Password"].map((label, i) => (
        <TextInput
          key={label}
          placeholder={label}
          secureTextEntry={label === "Password"}
          onChangeText={(v) =>
            setForm({ ...form, [label.toLowerCase()]: v })
          }
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 6,
            marginBottom: 12,
          }}
        />
      ))}

      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}

      <View style={{ marginBottom: 10 }}>
        <Button title="Register" onPress={register} />
      </View>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={{ textAlign: "center", color: "#007AFF" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
