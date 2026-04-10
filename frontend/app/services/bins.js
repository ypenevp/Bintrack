import { API_URL } from "@env";
console.log("IP from env:", API_URL);
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetAllBins() {
    try {
        const token = await AsyncStorage.getItem("access");

        const response = await fetch(`${API_URL}/api/bins/get/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to fetch bin data");
        }

    } catch(error) {
        console.error("Error fetching bin data:", error);
        throw error;
    }
}