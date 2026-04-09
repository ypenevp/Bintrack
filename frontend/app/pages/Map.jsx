import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

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

  const [dumpsters, setDumpsters] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/bins/get/all`)
      .then(res => res.text())
      .then(text => {
        if (!text) return [];
        return JSON.parse(text);
      })
      .then(data => setDumpsters(data || []))
      .catch(err => console.log("Error fetching dumpsters:", err));
  }, []);

  const mapHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"/>
<style>
body { margin:0 }
#map { height:100vh; width:100% }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>

<script>
var map = L.map('map').setView([42.6963, 23.3237], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© OpenStreetMap'
}).addTo(map);

var dumpsters = ${JSON.stringify(dumpsters)};
var colors = ${JSON.stringify(COLORS)};

// nearest neighbor algorithm
function getRoute(points) {
  if(points.length === 0) return [];
  let route = [points[0]];
  let remaining = points.slice(1);

  while (remaining.length) {
    let last = route[route.length - 1];
    let nearestIndex = 0;
    let minDist = Infinity;

    remaining.forEach((p, i) => {
      var c1 = last.coordinates.split(',');
      var c2 = p.coordinates.split(',');
      let dist = Math.hypot(parseFloat(c2[0])-parseFloat(c1[0]), parseFloat(c2[1])-parseFloat(c1[1]));
      if(dist < minDist){ minDist = dist; nearestIndex = i; }
    });

    route.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex,1);
  }

  return route;
}

// Add markers
dumpsters.forEach(function(d,i){
  if(!d.coordinates) return;
  var coords = d.coordinates.split(',');
  var lat = parseFloat(coords[0]);
  var lng = parseFloat(coords[1]);

  var color = d.status === "EMPTY" ? "#9E9E9E" : colors[i % colors.length];

  var icon = L.divIcon({
    html: '<div style="background:'+color+';width:30px;height:30px;border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold">'+d.id+'</div>',
    iconSize:[30,30]
  });

  var marker = L.marker([lat,lng], { icon: icon }).addTo(map);
  marker.bindPopup('<b>Bin #'+d.id+'</b><br>Location: '+(d.registeredLocation||'')+'<br>Status: '+(d.status||''));
});

// Routing only for non-EMPTY bins
var activeBins = dumpsters.filter(d => d.status !== "EMPTY");
if(activeBins.length > 1){
  var ordered = getRoute(activeBins);
  L.Routing.control({
    waypoints: ordered.map(d => {
      var c = d.coordinates.split(',');
      return L.latLng(parseFloat(c[0]), parseFloat(c[1]));
    }),
    routeWhileDragging:false,
    show:false
  }).addTo(map);
}

</script>
</body>
</html>
`;

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <ScrollView>
        <SectionTitle title="Smart Dumpster Map" />
        <View style={{
          marginHorizontal: PAD,
          borderRadius: 14,
          overflow:'hidden',
          height:540,
          elevation:10
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