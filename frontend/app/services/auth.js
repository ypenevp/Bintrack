import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleSignUp = async ({ username, password, email }) => {
    try {
        const response =  await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            data: {detail: "Check your email"}
        };
    } catch (error) {
        return {
            ok: false,
            data: { detail: "Network error. Please try again." }
        };
    }
}

export const handleVerify = async ({ code }) => {
    try {
        const response =  await fetch(`${API_URL}/api/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            data
        };
    } catch (error) {
        return {
            ok: false,
            data: { detail: "Wrong verification code." }
        };
    }
}

export const handleLogin = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            await AsyncStorage.setItem("access", data.access);
            await AsyncStorage.setItem("refresh", data.refresh);
        }

        return {
            ok: response.ok,
            data
        };
    } catch (error) {
        return {
            ok: false,
            data: { detail: "Wrong email or password." }
        };
    }
};