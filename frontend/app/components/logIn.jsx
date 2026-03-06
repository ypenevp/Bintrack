import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { handleLogin } from "../services/auth";

export default function Login({ onSignUpPress, onLoginSuccess, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const onLoginPress = async () => {
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        const result = await handleLogin({email, password})
        if (result.ok) {
            setUser({ email });
        } else {
            setError(result.data.detail || "Login failed.");
        }
    };

    return (
        <View style={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 24,
        }}>
            {/* Header */}
            <Text style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#374151",
                marginBottom: 24,
                textAlign: 'center'
            }}>Log in</Text>
            

            {/* Error Message */}
            {error ? (
                <View style={{
                    backgroundColor: "#fef2f2",
                    borderWidth: 1,
                    borderColor: "#fca5a5",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 20,
                    width: "100%"
                }}>
                    <Text style={{
                        color: "#dc2626",
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: 'center'
                    }}>
                        {error}
                    </Text>
                </View>
            ) : null}

            {/* Email Input */}
            <View style={{ 
                width: "100%", 
                marginBottom: 18
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12
                }}>
                    <Text style={{ 
                        fontSize: 18, 
                        color: '#9ca3af',
                        marginRight: 16,
                        width: 20
                    }}>👤</Text>
                    <View style={{ flex: 1 }}>
                        {(emailFocused || email) && (
                            <Text style={{
                                fontSize: 12,
                                color: '#15803d',
                                fontWeight: '600',
                                marginBottom: 4
                            }}>
                                Email
                            </Text>
                        )}
                        <TextInput
                            style={{
                                fontSize: 16,
                                color: "#374151",
                                fontWeight: "500",
                                paddingVertical: 4
                            }}
                            placeholder={emailFocused || email ? "" : "your email"}
                            placeholderTextColor="#9ca3af"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                    </View>
                    {email.includes('@') && email.includes('.') && (
                        <Text style={{ fontSize: 16, color: '#15803d', marginLeft: 8 }}>✓</Text>
                    )}
                </View>
                <View style={{
                    height: 2,
                    backgroundColor: (emailFocused || email) ? '#15803d' : '#e5e7eb',
                    marginLeft: 36
                }} />
            </View>

            {/* Password Input */}
            <View style={{ 
                width: "100%", 
                marginBottom: 40
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12
                }}>
                    <Text style={{ 
                        fontSize: 18, 
                        color: '#9ca3af',
                        marginRight: 4,
                        width: 30
                    }}>🔑</Text>
                    <View style={{ flex: 1 }}>
                        {(passwordFocused || password) && (
                            <Text style={{
                                fontSize: 12,
                                color: '#15803d',
                                fontWeight: '600',
                                marginBottom: 4
                            }}>
                                Password
                            </Text>
                        )}
                        <TextInput
                            style={{
                                fontSize: 16,
                                color: "#374151",
                                fontWeight: "500",
                                paddingVertical: 4
                            }}
                            placeholder={passwordFocused || password ? "" : "Your password"}
                            placeholderTextColor="#9ca3af"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                    </View>
                </View>
                <View style={{
                    height: 2,
                    backgroundColor: (passwordFocused || password) ? '#15803d' : '#e5e7eb',
                    marginLeft: 36
                }} />
            </View>

            {/* Login Button */}
            <TouchableOpacity
                style={{
                    width: "100%",
                    backgroundColor: loading ? "#9ca3af" : "#15803d",
                    borderRadius: 25,
                    paddingVertical: 18,
                    alignItems: "center",
                    marginBottom: 24,
                    shadowColor: "#15803d",
                    shadowOpacity: 0.3,
                    shadowOffset: { width: 0, height: 8 },
                    shadowRadius: 16,
                    elevation: 8
                }}
                onPress={onLoginPress}
                disabled={loading}
            >
                <Text style={{ 
                    color: "#ffffff", 
                    fontWeight: "700", 
                    fontSize: 18,
                    letterSpacing: 0.5
                }}>
                    {loading ? "Signing in..." : "Log in"}
                </Text>
            </TouchableOpacity>

            {/* Switch to Sign Up */}
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "center", 
                alignItems: "center"
            }}>
                <Text style={{
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: "500",
                    marginRight: 8
                }}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={onSignUpPress}>
                    <Text style={{
                        color: "#15803d",
                        fontWeight: "700",
                        fontSize: 16
                    }}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}