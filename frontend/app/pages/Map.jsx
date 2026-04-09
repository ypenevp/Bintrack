import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const PAD = 16;
const COLORS = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFC107'];

function SectionTitle({ title }) {
  return (
    <View style={{ paddingHorizontal: PAD, paddingTop: 24, paddingBottom: 6 }}>
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>{title}</Text>
    </View>
  );
}

export default function MapScreen() {
  const [mapHtml, setMapHtml] = useState('<html><body>Loading map...</body></html>');

  useEffect(() => {
    const initMap = async () => {
      try {
        const token = await AsyncStorage.getItem("access");
        if (!token) return console.log("No token found");

        const decoded = jwtDecode(token);
        const role = decoded.role;

        const response = await fetch(`${API_URL}/api/bins/get/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const dumpsters = await response.json();
        const activeBins = dumpsters.filter(d => d.status !== "EMPTY");

        const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"/>
<style>body{margin:0}#map{height:100vh;width:100%}</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
<script>
var map = L.map('map').setView([42.6963,23.3237],14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'© OpenStreetMap' }).addTo(map);

var dumpsters = ${JSON.stringify(dumpsters)};
var activeBins = ${JSON.stringify(activeBins)};
var colors = ${JSON.stringify(COLORS)};
var role = "${role}";

function getRoute(points){
  if(points.length===0) return [];
  let route=[points[0]];
  let remaining=points.slice(1);
  while(remaining.length){
    let last=route[route.length-1];
    let nearestIndex=0;
    let minDist=Infinity;
    remaining.forEach((p,i)=>{
      var c1=last.coordinates.split(',');
      var c2=p.coordinates.split(',');
      let dist=Math.hypot(parseFloat(c2[0])-parseFloat(c1[0]),parseFloat(c2[1])-parseFloat(c1[1]));
      if(dist<minDist){ minDist=dist; nearestIndex=i; }
    });
    route.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex,1);
  }
  return route;
}

dumpsters.forEach(function(d,i){
  if(!d.coordinates) return;
  var coords=d.coordinates.split(',');
  var lat=parseFloat(coords[0]);
  var lng=parseFloat(coords[1]);
  var color = d.status === "EMPTY" ? "#9E9E9E" : colors[i % colors.length];
  var icon=L.divIcon({
    html:'<div style="background:'+color+';width:30px;height:30px;border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold">'+d.id+'</div>',
    iconSize:[30,30]
  });
  L.marker([lat,lng],{icon:icon}).addTo(map)
    .bindPopup('<b>Bin #'+d.id+'</b><br>Location: '+(d.registeredLocation||'')+'<br>Status: '+(d.status||''));
});

if(role === "WORKER" && activeBins.length > 1){
  var ordered = getRoute(activeBins);
  L.Routing.control({
    waypoints: ordered.map(d=>{ var c=d.coordinates.split(','); return L.latLng(parseFloat(c[0]),parseFloat(c[1])); }),
    routeWhileDragging: false,
    show: false
  }).addTo(map);
}
</script>
</body>
</html>
        `;
        setMapHtml(html);

      } catch (err) {
        console.log("Error fetching dumpsters:", err);
      }
    };

    initMap();
  }, []);

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <ScrollView>
        <SectionTitle title="Smart Dumpster Map" />
        <View style={{
          marginHorizontal: PAD,
          borderRadius: 14,
          overflow: 'hidden',
          height: 540,
          elevation: 10
        }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: mapHtml }}
            style={{ flex:1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}