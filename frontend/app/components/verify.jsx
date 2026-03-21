import { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { handleVerify } from "../services/auth";

export default function VerifyCode({ onSuccess }) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)

    const onVerifyPress = async () => {
        setError("");
        if (!email || !code) {
            setError("Please fill in all fields.");
            return;
        }

        const result = await handleVerify({code});
        if(result.ok){
            setUser({email});
            onSuccess();
        } else {
            setError(result.data.detail || "Wrong code.");
        }
    }

    return (
        <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{
                width: 370,
                maxWidth: "100%",
                padding: 40,
                backgroundColor: "#fff",
                borderRadius: 24,
                elevation: 8,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 12,
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "#15803d",
                    marginBottom: 24
                }}>Verify Code</Text>

                <TextInput
                    style={{
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "#d1d5db",
                        borderRadius: 16,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        marginBottom: 16,
                        fontSize: 18,
                        backgroundColor: "#F7FAFC",
                        color: "#222",
                        fontWeight: "500",
                        letterSpacing: 0.5,
                    }}
                    placeholder="Verification Code"
                    placeholderTextColor="#888"
                    value={code}
                    onChangeText={setCode}
                />

                {error ? <Text style={{ fontSize: 16, color: "#dc2626", marginBottom: 8 }}>{error}</Text> : null}

                <TouchableOpacity
                    style={{
                        width: "100%",
                        backgroundColor: "#15803d",
                        borderRadius: 16,
                        paddingVertical: 14,
                        alignItems: "center",
                        marginBottom: 16,
                        shadowColor: "#000",
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                    onPress={onVerifyPress}
                    disabled={loading}
                >
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                        {loading ? "Verifying..." : "Verify"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}