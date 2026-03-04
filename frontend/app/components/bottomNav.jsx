import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const tabs = [
  { name: "Map", route: "Map", icon: "map-marker-alt" },
  { name: "Stats", route: "Stats", icon: "monitor-dashboard" },
  { name: "Settings", route: "Settings", icon: "spinner-cog" },
];

export default function BottomNav({ navigation }) {
  const containerPadding = 20;

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        flexDirection: "row",
        paddingHorizontal: containerPadding,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e5e5e5",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 8,
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate(tab.route)}
        >
            {tab.icon === "monitor-dashboard" ? (
                <MaterialCommunityIcon name={tab.icon} size={30} color="#15803d" />
            ) : (
                <Icon name={tab.icon} size={30} color="#15803d" />
            )}
          <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 4, color: "#15803d" }}>{tab.name}</Text>
        </TouchableOpacity>
      ))}
    </View>

  );
}