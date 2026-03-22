import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, Animated, Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';

const TopNav = ({ navigation, onLoginPress, onSignUpPress }) => {
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { user: userDetails } = useUser();
    const isLoggedIn = !!authUser;

    const tabs = [
        { name: "Home", route: "Home" },
        { name: "Map", route: "Map" },
        { name: "Stats", route: "Stats" },
        { name: "Settings", route: "Settings" },
        { name: "Updates", route: "Updates" },
        { name: "Users", route: "Users" }
    ];

    const [open, setOpen] = useState(false);
    const screenWidth = Dimensions.get("window").width;
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
            togglePanel();
        }
    };

    const visibleTabs = tabs.filter(tab => {
        if (tab.route === "Updates") {
            return isLoggedIn && userDetails?.role === "ADMIN";
        }
        if (tab.route === "Users") {
            return isLoggedIn && userDetails?.role === "ADMIN";
        }
        return true;
    });

    if (authLoading) {
        return (
            <View style={{
                width: "100%",
                height: 110,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 8,
                paddingTop: 50,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flexDirection: "row", alignItems: "center", paddingLeft: 5 }}>
                    <Image source={require("../../assets/logo.png")} style={{ width: 70, height: 70, resizeMode: "cover" }} />
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#15803d", marginBottom: 4 }}>BinTrack</Text>
                </TouchableOpacity>
                <Pressable onPress={togglePanel} style={{ paddingHorizontal: 10, marginRight: -4 }}>
                    <Text style={{ fontSize: 38, color: "#15803d" }}>☰</Text>
                </Pressable>
            </View>
        );
    }


    return (
        <>
            <StatusBar value="auto" />
            <View style={{
                width: "100%",
                height: 110,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                elevation: 8,
                zIndex: 50,
                paddingBottom: 4,
                paddingTop: 50,
                overflow: "visible",
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignContent: "center", paddingLeft: 0, paddingRight: 0}}>
                    <Image source={require("../../assets/logo.png")} style={{ width: 60, height: 60, resizeMode: "cover" }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#15803d", marginBottom: 0 }}>JunkBuddy</Text>
                </TouchableOpacity>

                {!isLoggedIn && (
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#f8f9fa",
                        borderRadius: 15,
                        overflow: "hidden",
                        borderWidth: 2,
                        borderColor: "#15803d",
                        marginRight: -22,
                        marginBottom: 0,
                    }}>
                        <TouchableOpacity onPress={onLoginPress} style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            backgroundColor: "#fff",
                            marginRight: 1,
                        }}>
                            <Text style={{ fontSize: 14, fontWeight: "600", color: "#15803d" }}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            backgroundColor: "#15803d",
                        }} onPress={onSignUpPress}>
                            <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Pressable onPress={togglePanel} style={{ paddingHorizontal: 10, paddingLeft: 15, marginBottom: 0, marginRight: 5, marginLeft: 0 }}>
                    <Text style={{ fontSize: 38, color: "#15803d" }}>☰</Text>
                </Pressable>
            </View>

            {open && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={togglePanel}
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: 90,
                    }}
                />
            )}

            {open && (
                <Animated.View style={{
                    position: "absolute",
                    top: 0, bottom: 0, right: 0,
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
                }}>
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

                    {visibleTabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateTo(tab)}
                            style={{
                                padding: 16,
                                borderBottomWidth: 1,
                                borderBottomColor: "#e5e7eb",
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#15803d" }}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            )}
        </>
    );
};

export default TopNav;