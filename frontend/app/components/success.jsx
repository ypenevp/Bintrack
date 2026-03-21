import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Success({ onDone }) {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(onDone) {
                onDone();
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center" }}>
            
            <View style={{
                width: 370,
                maxWidth: "80%",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 24,
                elevation: 8,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 12,
            }}>
                <Ionicons name="checkmark-circle-outline" size={75} color="#15803d" style={{ marginBottom: 10 }} />
                <Text style={{fontSize: 32, fontWeight: "bold", color: "#15803d", textAlign: "center", }}>Success!</Text>
                <Text style={{fontSize: 16, color: "#15803d", textAlign: "center", marginTop: 8 }}>Your account has been successfully created.</Text>
            </View>
        </View>
    );
}