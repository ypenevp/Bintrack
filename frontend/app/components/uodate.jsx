import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const mountainImage = require("../assets/mountain.png");
const architectureImage = require("../assets/architecture.png")
const inovationImage = require("../assets/inovation.png")

const images = [
    { title: "Beautiful Mountain Landscape Photography Collection for Nature Enthusiasts", imageSource: mountainImage },
    { title: "Modern Urban Architecture and City Skylines Development Projects Around the World", imageSource: architectureImage },
    { title: "Advanced Technology Innovation and Digital Transformation Solutions for Business Growth", imageSource: inovationImage },
]

export default function ImageCart({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <ScrollView
                style={{ flex: 1, marginTop: -50 }}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingTop: 100,
                    paddingVertical: 20,
                    paddingBottom: 100,
                }}
            >
                {images.map((item, index) => (
                    <TouchableOpacity key={index}>
                        <View style={{
                            marginBottom: 20,
                            alignItems: "center",
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            padding: 16,
                            elevation: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            width: 350,
                        }}>

                            <View style={{
                                width: 300,
                                height: 150,
                                backgroundColor: '#e5e7eb',
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                borderBottomLeftRadius: 16,
                                borderBottomRightRadius: 16,
                            }}>
                                <Image
                                    source={item.imageSource}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMode='cover'
                                />
                            </View>

                            <View style={{
                                padding: 10,
                                alignItems: 'center',
                                marginBottom: -10,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#1f2937'
                                }}>
                                    {item.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView >
        </View >
    );
}