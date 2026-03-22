import { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import TopNav from "../../components/topNav.jsx";
import BottomNav from "../../components/bottomNav.jsx";
import * as DocumentPicker from 'expo-document-picker';
import { GetUserDetails } from "../../services/userDetails.js";
import { AddUpdate } from "../../services/updates.js";

let DateTimePicker = null;
if (Platform.OS !== 'web') {
    try {
        DateTimePicker = require('@react-native-community/datetimepicker').default;
    } catch (error) {
    }
}

export default function FormUpdates({ onLoginPress, onVerifyPress, navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = await GetUserDetails();
            setUserRole(details.role);
        };
        fetchUserDetails();
    }, []);

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true
            });

            if (!result.canceled) {
                setSelectedFile(result.assets[0]);
            }
        } catch (error) {
            alert('Error selecting file');
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const onSubmit = () => {
        if (!title || !description) {
            alert("Please fill in all fields.");
            return;
        }

        if (!selectedFile) {
            alert("Please select an image.");
            return;
        }

        setLoading(true);

        const imageFile = {
            uri: selectedFile.uri,
            type: selectedFile.mimeType || 'image/jpeg',
            name: selectedFile.name || 'update-image.jpg'
        };

        AddUpdate(title, description, imageFile)
            .then(response => {
                alert("Update added successfully!");
                setTitle("");
                setDescription("");
                setSelectedFile(null);
            })
            .catch(error => {
                alert("Error adding update. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <TopNav navigation={navigation} />
            {userRole == "ADMIN" ? (
                <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }} contentContainerStyle={{ alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
                    <View style={{
                        width: 370,
                        maxWidth: "100%",
                        padding: 30,
                        borderRadius: 24,
                        shadowColor: "#000",
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 8,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            color: "#15803d",
                            marginBottom: 24
                        }}>Update Form</Text>
                        
                        <TextInput
                            style={{
                                width: "100%",
                                borderWidth: 1,
                                borderColor: "#d1d5db",
                                borderRadius: 16,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                marginBottom: 15,
                                fontSize: 18,
                                backgroundColor: "#F7FAFC",
                                color: "#222",
                                fontWeight: "500",
                                letterSpacing: 0.5,
                            }}
                            placeholder="Title"
                            placeholderTextColor="#888"
                            keyboardType="default"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={{
                                width: "100%",
                                borderWidth: 1,
                                borderColor: "#d1d5db",
                                borderRadius: 16,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                fontSize: 18,
                                backgroundColor: "#F7FAFC",
                                color: "#222",
                                fontWeight: "500",
                                letterSpacing: 0.5,
                                marginBottom: 15,
                                height: 100,
                                textAlignVertical: "top",
                            }}
                            placeholder="Description"
                            placeholderTextColor="#888"
                            keyboardType="default"
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={{
                            width: "100%",
                            marginBottom: 15,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "#555",
                                marginBottom: 8,
                            }}>Select Image</Text>

                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    borderWidth: 1,
                                    borderColor: selectedFile ? "#15803d" : "#d1d5db",
                                    borderRadius: 16,
                                    paddingHorizontal: 20,
                                    paddingVertical: 12,
                                    backgroundColor: selectedFile ? "#f0f9f0" : "#F7FAFC",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                onPress={pickFile}
                            >
                                <View style={{ flex: 1 }}>
                                    {selectedFile ? (
                                        <View>
                                            <Text style={{
                                                fontSize: 16,
                                                color: "#222",
                                                fontWeight: "500",
                                            }} numberOfLines={1}>
                                                {selectedFile.name}
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: "#666",
                                                marginTop: 2,
                                            }}>
                                                {formatFileSize(selectedFile.size)}
                                            </Text>
                                        </View>
                                    ) : (
                                        <Text style={{
                                            fontSize: 16,
                                            color: "#888",
                                            fontWeight: "500",
                                        }}>
                                            Tap to select image
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            {selectedFile && (
                                <TouchableOpacity
                                    style={{
                                        marginTop: 8,
                                        alignSelf: "flex-end",
                                        paddingVertical: 4,
                                        paddingHorizontal: 8,
                                    }}
                                    onPress={removeFile}
                                >
                                    <Text style={{
                                        fontSize: 14,
                                        color: "#dc2626",
                                        fontWeight: "500",
                                    }}>
                                        Remove File
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            style={{
                                width: "100%",
                                backgroundColor: "#15803d",
                                borderRadius: 16,
                                paddingVertical: 14,
                                alignItems: "center",
                                shadowColor: "#fff",
                                shadowOpacity: 0.15,
                                shadowRadius: 8,
                                elevation: 6,
                                marginTop: 10,
                            }}
                            onPress={onSubmit}
                            disabled={loading}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                                {loading ? "Submitting..." : "Submit"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#15803d" }}>Access Denied</Text>
                    <Text style={{ fontSize: 16, color: "#555", marginTop: 8 }}>You do not have permission to view this page.</Text>
                </View>
            )}
            
            <BottomNav navigation={navigation} />
        </View>
    );
}