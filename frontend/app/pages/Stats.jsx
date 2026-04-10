import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { GetAllBins } from "../services/bins";
import { FontAwesome5 } from '@expo/vector-icons';

const LEVEL_CONFIG = {
  empty: { color: "#4CAF50", label: "Empty", barWidth: "15%" },
  medium: { color: "#FF9800", label: "Medium", barWidth: "55%" },
  full: { color: "#f44336", label: "Full", barWidth: "100%" },
};

function StatsHeader({ totalBins, emptyCount, mediumCount, fullCount }) {
  return (
    <View style={{ borderRadius: 24, padding: 28, overflow: "hidden", backgroundColor: "#2e7d32" }}>
      <View style={{ position: "absolute", top: -30, right: -20, width: 140, height: 140, borderRadius: 70, backgroundColor: "rgba(255,255,255,0.08)" }} />
      <View style={{ position: "absolute", bottom: -40, left: 40, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.05)" }} />
      
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
          <FontAwesome5 name="trash-alt" size={FontAwesome5.size * 3} color="#ffffff" />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#ffffff", letterSpacing: -0.5 }}>BinTrack</Text>
          <Text style={{ fontSize: 13, fontWeight: "500", color: "rgba(255,255,255,0.85)" }}>Statistics</Text>
        </View>
      </View>
      
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 1 }}>Total Bins</Text>
          <Text style={{ fontSize: 36, fontWeight: "800", color: "#ffffff", marginTop: 4 }}>{totalBins}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 1 }}>Number of Bins by Level</Text>
          
          <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#a5d6a7" }} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#ffffff" }}>{emptyCount}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFD54F" }} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#ffffff" }}>{mediumCount}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#ef9a9a" }} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#ffffff" }}>{fullCount}</Text>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

function BinCard({ id, level, lat, lng, location }) {
  const config = LEVEL_CONFIG[level];

  const openMap = () => {
    Linking.openURL(`https://www.google.com/maps?q=${lat},${lng}`);
  };

  return (
    <View style={{ backgroundColor: "#ffffff", borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "#e8e8e8", marginBottom: 16 }}>
      
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: config.color + "18" }}>
            <FontAwesome5 name="trash-alt" size={28} color={config.color} />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#9e9e9e", letterSpacing: 1.2, textTransform: "uppercase" }}>BIN # {id}</Text>
            <Text style={{ fontSize: 25, fontWeight: "800", color: "#2d2d2d", lineHeight: 32 }}>{location}</Text>
          </View>
        </View>
        
        <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 30, backgroundColor: config.color + "14" }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: config.color }}>{config.label}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 }}>
        <Text style={{ fontSize: 13, fontWeight: "500", color: "#888888", marginBottom: 10 }}>Fill Level</Text>
        
        <View style={{ width: "100%", height: 10, backgroundColor: "#f0f0f0", borderRadius: 10, overflow: "hidden" }}>
          <View style={{ height: "100%", borderRadius: 10, width: config.barWidth, backgroundColor: config.color }} />
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
          <Text style={{ fontSize: 10, color: "#bbbbbb" }}>Empty</Text>
          <Text style={{ fontSize: 10, color: "#bbbbbb" }}>Full</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={{ padding: 14, backgroundColor: "#f8f8f8", alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#f0f0f0" }} 
        onPress={openMap} 
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#4CAF50" }}>📍 View on Map</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Stats() {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    async function fetchBins() {
      try {
        const data = await GetAllBins();
        setBins(Array.isArray(data) ? data : data.bins || []);
        console.log("Fetched bins:", data);
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    }

    fetchBins();
  }, []);

  const safeBins = Array.isArray(bins) ? bins : [];

  const emptyCount = safeBins.filter((b) => !b.status || b.status.toLowerCase() === "empty").length;
  const mediumCount = safeBins.filter((b) => b.status && b.status.toLowerCase() === "medium").length;
  const fullCount = safeBins.filter((b) => b.status && b.status.toLowerCase() === "full").length;

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: "#f5f5f5" }} 
      contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
    >
      <StatsHeader 
        totalBins={safeBins.length} 
        emptyCount={emptyCount} 
        mediumCount={mediumCount} 
        fullCount={fullCount} 
      />
      
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#555555", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 28, marginBottom: 12 }}>
        All Bins
      </Text>
      
      {safeBins.length === 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 40, marginTop: 20 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#e2e8f0", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <FontAwesome5 name="trash-alt" size={32} color="#16a34a" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#4b5563", marginBottom: 8 }}>
            No Bins Found
          </Text>
          <Text style={{ fontSize: 14, color: "#9ca3af", textAlign: "center", maxWidth: 250 }}>
            There are currently no smart bins added to the system.
          </Text>
        </View>
      ) : (
        safeBins.map((bin) => {
          const safeStatus = (bin.status || "empty").toLowerCase();
          
          let latVal = 0, lngVal = 0;
          if (bin.coordinates) {
             const parts = bin.coordinates.split(',');
             if (parts.length >= 2) {
               latVal = parseFloat(parts[0].trim());
               lngVal = parseFloat(parts[1].trim());
             }
          }

          return (
            <BinCard
              key={bin.id}
              id={bin.id}
              level={safeStatus}
              lat={latVal}
              lng={lngVal}
              location={bin.registeredLocation}
            />
          );
        })
      )}
    </ScrollView>
  );
}