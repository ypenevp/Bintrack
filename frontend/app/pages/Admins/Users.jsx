import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import TopNav from "../../components/topNav.jsx";
import BottomNav from "../../components/bottomNav.jsx";
import { GetAllUsers } from "../../services/userDetails.js";

export default function FormUpdates1({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await GetAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <TopNav navigation={navigation} />
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Users</Text>
                {users.map((user) => (
                    <View key={user.id} style={{ marginBottom: 15, padding: 15, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
                        <Text style={{ fontSize: 18 }}>{user.username}</Text>
                        <Text style={{ color: "#555" }}>{user.email}</Text>
                        <Text style={{ color: "#555" }}>Role: {user.role}</Text>
                    </View>
                ))}
            </ScrollView>
            <BottomNav navigation={navigation} />
        </View>
    );
}