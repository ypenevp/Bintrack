// app/screens/FormUpdates1.jsx
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import TopNav from "../../components/topNav.jsx";
import BottomNav from "../../components/bottomNav.jsx";
import { GetAllUsers } from "../../services/userDetails.js";
import { RoleChange } from "../../services/roles.js";

const ROLES = [
    { value: "ADMIN", label: "Admin", color: "#7c3aed", bg: "#ede9fe" },
    { value: "USER", label: "User", color: "#059669", bg: "#ecfdf5" },
    { value: "WORKER", label: "Worker", color: "#d97706", bg: "#fef3c7" },
];

function getRoleStyle(role) {
    const found = ROLES.find((r) => r.value === role?.toUpperCase());
    return found || { value: role, label: role, color: "#6b7280", bg: "#f3f4f6" };
}

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

const AVATAR_COLORS = ["#7c3aed", "#3b82f6", "#059669", "#e11d48", "#d97706", "#0891b2"];

function UserCard({ user, onRoleChange }) {
    const [open, setOpen] = useState(false);
    const roleStyle = getRoleStyle(user.role);
    const avatarColor = AVATAR_COLORS[user.id % AVATAR_COLORS.length] || AVATAR_COLORS[0];

    return (
        <View
            style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
                overflow: "hidden",
            }}
        >
            {/* Main Row */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                }}
            >
                <View
                    style={{
                        width: 46,
                        height: 46,
                        borderRadius: 23,
                        backgroundColor: avatarColor,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
                        {getInitials(user.username)}
                    </Text>
                </View>

                <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#1f2937" }}>
                        {user.username}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                        {user.email}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => setOpen(!open)}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: roleStyle.bg,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999,
                        gap: 4,
                    }}
                >
                    <Text style={{ fontSize: 13, fontWeight: "600", color: roleStyle.color }}>
                        {roleStyle.label}
                    </Text>
                    <Feather
                        name={open ? "chevron-up" : "chevron-down"}
                        size={14}
                        color={roleStyle.color}
                    />
                </TouchableOpacity>
            </View>

            {/* Inline Dropdown */}
            {open && (
                <View
                    style={{
                        borderTopWidth: 1,
                        borderTopColor: "#f3f4f6",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        flexDirection: "column",
                    }}
                >
                    {ROLES.map((role) => {
                        const isActive = role.value === user.role?.toUpperCase();
                        return (
                            <TouchableOpacity
                                key={role.value}
                                activeOpacity={0.7}
                                onPress={() => {
                                    onRoleChange(user.email, role.value);
                                    setOpen(false);
                                }}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    borderRadius: 10,
                                    backgroundColor: isActive ? role.bg : "transparent",
                                    marginBottom: 2,
                                }}
                            >
                                <View
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: role.color,
                                        marginRight: 10,
                                    }}
                                />
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 14,
                                        fontWeight: isActive ? "700" : "500",
                                        color: isActive ? role.color : "#374151",
                                    }}
                                >
                                    {role.label}
                                </Text>
                                {isActive && <Feather name="check" size={16} color={role.color} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
}

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

    const handleRoleChange = (userEmail, newRole) => {
        RoleChange(userEmail, newRole)
            .then(() => {
                setUsers((prev) =>
                    prev.map((u) =>
                        u.email === userEmail ? { ...u, role: newRole } : u
                    )
                );
            })
            .catch((error) => {
                console.error("Error changing role:", error);
            });
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
            <TopNav navigation={navigation} />
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                <Text style={{ fontSize: 26, fontWeight: "700", color: "#0f172a", marginBottom: 4 }}>
                    Users
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20 }}>
                    Manage roles and permissions
                </Text>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} onRoleChange={handleRoleChange} />
                ))}
            </ScrollView>
            <BottomNav navigation={navigation} />
        </View>
    );
}
