import { API_URL } from "@env";
console.log("IP from env:", API_URL);
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function RoleChange(userEmail, newRole) {
    try {
        const token = await AsyncStorage.getItem("access");

        const response = await fetch(`${API_URL}/api/admin/users/role`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: userEmail, role: newRole})
        });

    } catch (error) {
        console.error('Error changing role:', error);
        throw error;
    }
}