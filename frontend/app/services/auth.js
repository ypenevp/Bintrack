import { API_URL } from "@env";
console.log("IP from env:", API_URL);
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const handleSignUp = async ({ username, password, email }) => {
    try {
        console.log("API URL:", API_URL);

        console.log("Signup data:", { username, email });

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        });

        const responseText = await response.text();
        console.log("Signup raw response:", responseText);

        let data = {};
        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch {
                data = {};
            }
        }

        if (response.ok) {
            return {
                ok: true,
                data: { detail: "Check your email" }
            };
        } else {
            return {
                ok: false,
                data: { detail: data.message || data.detail || "Registration failed." }
            };
        }

    } catch (error) {
        return {
            ok: false,
            data: { detail: `Network error: ${error.message}` }
        };
    }
};


export const handleVerify = async ({ code }) => {
    try {
        console.log("API URL:", API_URL);

        const response = await fetch(`${API_URL}/api/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });

        if (response.ok) { // always add
            return {
                ok: true,
                data: { detail: "Email verified successfully" }
            };
        } else {
            const errorText = await response.text(); // important
            return {
                ok: false,
                data: { detail: errorText || "Verification failed" }
            };
        }

    } catch (error) {
        return {
            ok: false,
            data: { detail: `Network error: ${error.message}` }
        };
    }
};



export const handleLogin = async ({ email, password }) => {
    try {
        console.log("API URL:", API_URL);

        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const responseText = await response.text();

        let data;
        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                return {
                    ok: false,
                    data: { detail: "Server response error" }
                };
            }
        } else {
            return {
                ok: false,
                data: { detail: "Empty server response" }
            };
        }

        if (response.ok) {
            await AsyncStorage.setItem("access", data.token); //VERY COMMON ERROR !!! (access -> token)
            try {
                const decoded = jwtDecode(data.token);
                const userRole = decoded.role; // "ADMIN", "USER", "WORKER"
                // const userEmail = decoded.email;
                
                await AsyncStorage.setItem("userRole", userRole);
                // await AsyncStorage.setItem("userEmail", userEmail);
                
                console.log("The role of the user:", userRole);
                // console.log("The email of the user:", userEmail);
                
            } catch (decodeError) {
                console.error("Error while decoding JWT:", decodeError);
            }
        } else {
        }

        return {
            ok: response.ok,
            data
        };
    } catch (error) {
        return {
            ok: false,
            data: { detail: `Network error: ${error.message}` }
        };
    }
};