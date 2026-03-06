import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { handleSignUp } from "../services/auth.js";

export default function SignUp({ onLoginPress, onClose, onShowVerify }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false);

    const onSignUpPress = async () => {
        setError("");
        if (!email || !username || !password || !repeatPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const result = await handleSignUp({ username, password, email });
        if(result.ok) {
            if(onShowVerify) {
                onShowVerify();
            } else {
                onLoginPress();
            }
        } else {
            setError(result.data.detail || "Sign Up failed.");
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            <View style={{ 
                width: "100%", 
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: 24,
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: "800",
                    color: "#374151",
                    marginBottom: 24,
                    textAlign: 'center'
                }}>Sign up</Text>

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
                        }}>@</Text>
                        <View style={{ flex: 1 }}>
                            {(usernameFocused || username) && (
                                <Text style={{
                                    fontSize: 12,
                                    color: '#15803d',
                                    fontWeight: '600',
                                    marginBottom: 4
                                }}>
                                    Username
                                </Text>
                            )}
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    color: "#374151",
                                    fontWeight: "500",
                                    paddingVertical: 4
                                }}
                                placeholder={usernameFocused || username ? "" : "choose username"}
                                placeholderTextColor="#9ca3af"
                                value={username}
                                onChangeText={setUsername}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                            />
                        </View>
                        {username.length >= 3 && (
                            <Text style={{ fontSize: 16, color: '#15803d', marginLeft: 8 }}>✓</Text>
                        )}
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: (usernameFocused || username) ? '#15803d' : '#e5e7eb',
                        marginLeft: 36
                    }} />
                </View>

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
                                placeholder={passwordFocused || password ? "" : "your password"}
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                        </View>
                        {password.length >= 6 && (
                            <Text style={{ fontSize: 16, color: '#15803d', marginLeft: 8 }}>✓</Text>
                        )}
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: (passwordFocused || password) ? '#15803d' : '#e5e7eb',
                        marginLeft: 36
                    }} />
                </View>

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
                            {(repeatPasswordFocused || repeatPassword) && (
                                <Text style={{
                                    fontSize: 12,
                                    color: '#15803d',
                                    fontWeight: '600',
                                    marginBottom: 4
                                }}>
                                    Repeat Password
                                </Text>
                            )}
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    color: "#374151",
                                    fontWeight: "500",
                                    paddingVertical: 4
                                }}
                                placeholder={repeatPasswordFocused || repeatPassword ? "" : "repeat password"}
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                                onFocus={() => setRepeatPasswordFocused(true)}
                                onBlur={() => setRepeatPasswordFocused(false)}
                            />
                        </View>
                        {password && repeatPassword && password === repeatPassword && (
                            <Text style={{ fontSize: 16, color: '#15803d', marginLeft: 8 }}>✓</Text>
                        )}
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: (repeatPasswordFocused || repeatPassword) ? '#15803d' : '#e5e7eb',
                        marginLeft: 36
                    }} />
                </View>

                <TouchableOpacity
                    style={{
                        width: "100%",
                        backgroundColor: loading ? "#9ca3af" : "#15803d",
                        borderRadius: 25,
                        paddingVertical: 18,
                        alignItems: "center",
                        marginBottom: 24,
                        shadowColor: "#15803d",
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 8 },
                        shadowRadius: 16,
                        elevation: 8
                    }}
                    onPress={onSignUpPress}
                    disabled={loading}
                >
                    <Text style={{ 
                        color: "#ffffff", 
                        fontWeight: "700", 
                        fontSize: 18,
                        letterSpacing: 0.5
                    }}>
                        {loading ? "Signing up..." : "Sign up"}
                    </Text>
                </TouchableOpacity>

                <View style={{ 
                    flexDirection: "row", 
                    justifyContent: "center", 
                    alignItems: "center",
                    marginBottom: 16
                }}>
                    <Text style={{
                        color: "#6b7280",
                        fontSize: 16,
                        fontWeight: "500",
                        marginRight: 8
                    }}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={onLoginPress}>
                        <Text style={{
                            color: "#15803d",
                            fontWeight: "700",
                            fontSize: 16
                        }}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}