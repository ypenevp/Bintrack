import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated, Dimensions, TouchableOpacity, } from "react-native";
import { StatusBar } from "react-native";

const screenWidth = Dimensions.get("window").width;

const TopNav = ({ navigation, onLoginPress, onSignUpPress, isLoggedIn }) => {
    const tabs = [
        { name: "Home", route: "Home" },
        { name: "Map", route: "Map" },
        { name: "Stats", route: "Stats" },
        { name: "Settings", route: "Settings" },
    ];

    const [open, setOpen] = useState(false);
    const [overlayActive, setOverlayActive] = useState(false);
    const slideAnim = useState(new Animated.Value(screenWidth))[0];

    const togglePanel = () => {
        if (open) {
            Animated.timing(slideAnim, {
                toValue: screenWidth,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setOpen(false));
        } else {
            setOpen(true);
            Animated.timing(slideAnim, {
                toValue: screenWidth * 0.5,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const navigateTo = (tab) => {
        if (navigation && tab.route) {
            navigation.navigate(tab.route);
            togglePanel(); // Close panel after navigation
        }
    };

    return (
        <>
            <StatusBar value="auto" />
            {/* Top bar */}
            <View
                style={{
                    width: "100%",
                    height: 110,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    elevation: 8,
                    zIndex: 50,
                    paddingBottom: 8,
                    paddingTop: 50,
                    overflow: "visible",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 5 }}>
                    <TouchableOpacity style={{ width: 60, height: 60, marginRight: -8, overflow: "hidden", borderRadius: 30, justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate("Home")}>
                        <Image source={require("../../assets/logo.png")} style={{ width: 80, height: 80, resizeMode: "cover" }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#15803d", marginLeft: 10, marginBottom: 4 }}>BinTrack</Text>
                </View>
                { !isLoggedIn && (
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#f8f9fa",
                        borderRadius: 15,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "#343434",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 20,
                        elevation: 3,
                        marginRight: -22,
                        marginBottom: 5,
                    }}>
                        <TouchableOpacity onPress={onLoginPress} style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            backgroundColor: "#fff",
                            marginRight: 1,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "600",
                                color: "#15803d",
                            }}>
                                Log In
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            backgroundColor: "#15803d",
                        }} onPress={onSignUpPress}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "600",
                                color: "#fff",
                            }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}


                <Pressable onPress={togglePanel} style={{ paddingHorizontal: 10, paddingLeft: 10, marginBottom: 2 }}>
                    <Text style={{ fontSize: 38, color: "#15803d" }}>☰</Text>
                </Pressable>

            </View >

            {open && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={togglePanel}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: 90,
                    }}
                />
            )
            }



            {/* Side panel */}
            {
                open && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width: screenWidth * 0.9,
                            backgroundColor: "#fff",
                            zIndex: 100,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { width: -4, height: 0 },
                            shadowRadius: 6,
                            elevation: 10,
                            paddingTop: 60,
                            transform: [{
                                translateX: slideAnim.interpolate({
                                    inputRange: [0, screenWidth],
                                    outputRange: [0, screenWidth * 0.9],
                                })
                            }],
                        }}
                    >
                        {/* Close button */}
                        <TouchableOpacity
                            onPress={togglePanel}
                            style={{
                                padding: 16,
                                paddingRight: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: "#e5e7eb",
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15803d" }}>➜</Text>
                        </TouchableOpacity>

                        {/* Navigation buttons */}
                        {tabs.map((tab, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigateTo(tab)}
                                style={{
                                    padding: 16,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#e5e7eb",
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#15803d" }}>{tab.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                )
            }

            {/* Gray overlay */}
            {
                overlayActive && (
                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.25)",
                            zIndex: 200,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Loading Charts...</Text>
                    </View>
                )
            }
        </>
    );
};

export default TopNav;