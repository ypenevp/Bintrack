import { API_URL } from "@env";
console.log("IP from env:", API_URL);
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function AddUpdate(title, article, image) { // POST fetch with images
    try {

        const token = await AsyncStorage.getItem("access");
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('article', article);
        formData.append('image', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.name || 'update-image.jpg'
        })

        const response = await fetch(`${API_URL}/api/updates/createupdate`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            body: formData
        });


        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to create update");
        }

    } catch (error) {
        console.error('Error creating update:', error);
        throw error;
    }

}

export async function EditUpdate(id) { // Patch updates
     try {

        const token = await AsyncStorage.getItem("access");
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const response = await fetch(`${API_URL}/api/updates/updateupdate/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to edit update");
        }

    } catch (error) {
        console.error('Error editing update:', error);
        throw error;
    }
}

export async function DeleteUpdate(id) {
    try {

        const token = await AsyncStorage.getItem("access");
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const response = await fetch(`${API_URL}/api/updates/deleteupdate/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error("Failed to delete update");
        }

    } catch (error) {
        console.error('Error deleting update:', error);
        throw error;
    }
}

export async function GetUpdates() { // GET many fetch
    try {

        const response = await fetch(`${API_URL}/api/updates/getall`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to get updates");
        }

    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
}

export async function GetUpdate(id) { // GET one fetch
    try {
        const response = await fetch(`${API_URL}/api/updates/getupdate/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to get update");
        }

    } catch (error) {
        console.error('Error fetching update:', error);
        throw error;
    }
}