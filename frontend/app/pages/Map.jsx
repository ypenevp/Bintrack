import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import * as Location from 'expo-location';
import { API_URL } from '@env';

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
  const [mapHtml, setMapHtml] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const webviewRef = useRef(null);
  const watcherRef = useRef(null);

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
<style>
body{margin:0}
#map{height:100vh;width:100%}
#panel{
  position:absolute;
  top:10px;
  left:50%;
  transform:translateX(-50%);
  z-index:1000;
  background:white;
  border-radius:14px;
  box-shadow:0 2px 8px rgba(0,0,0,0.2);
  max-width:85%;
  min-width:220px;
  overflow:hidden;
}
#next-bin{
  padding:8px 14px;
  font-size:13px;
  font-weight:700;
  color:#1565C0;
  text-align:center;
  border-bottom:1px solid #eee;
}
#steps{
  padding:4px 0;
}
.step{
  padding:5px 14px;
  font-size:12px;
  color:#333;
  text-align:center;
}
</style>
</head>
<body>
<div id="panel">
  <div id="next-bin">Изчакване на GPS...</div>
  <div id="steps"></div>
</div>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var map = L.map('map').setView([42.6963,23.3237],14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'© OpenStreetMap' }).addTo(map);

var dumpsters = ${JSON.stringify(dumpsters)};
var activeBins = ${JSON.stringify(activeBins)};
var colors = ${JSON.stringify(COLORS)};
var role = "${role}";

dumpsters.forEach(function(d,i){
  if(!d.coordinates) return;
  var coords = d.coordinates.split(',');
  var lat = parseFloat(coords[0]);
  var lng = parseFloat(coords[1]);
  var color = d.status === "EMPTY" ? "#9E9E9E" : colors[i % colors.length];
  var icon = L.divIcon({
    html:'<div style="background:'+color+';width:30px;height:30px;border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px">'+d.id+'</div>',
    iconSize:[30,30],
    className:''
  });
  L.marker([lat,lng],{icon:icon}).addTo(map)
    .bindPopup('<b>Кошче #'+d.id+'</b><br>Адрес: '+(d.registeredLocation||'')+'<br>Статус: '+(d.status||''));
});

function getOrderedRoute(startLat, startLng, points){
  if(points.length === 0) return [];
  var remaining = points.slice();
  var route = [];
  var curLat = startLat;
  var curLng = startLng;
  while(remaining.length){
    var nearestIndex = 0;
    var minDist = Infinity;
    remaining.forEach(function(p, i){
      var c = p.coordinates.split(',');
      var dist = Math.hypot(parseFloat(c[0]) - curLat, parseFloat(c[1]) - curLng);
      if(dist < minDist){ minDist = dist; nearestIndex = i; }
    });
    var nearest = remaining[nearestIndex];
    route.push(nearest);
    var nc = nearest.coordinates.split(',');
    curLat = parseFloat(nc[0]);
    curLng = parseFloat(nc[1]);
    remaining.splice(nearestIndex, 1);
  }
  return route;
}

function translateStep(step){
  var type = step.maneuver.type;
  var modifier = step.maneuver.modifier || '';
  var dist = step.distance < 1000
    ? Math.round(step.distance) + ' м'
    : (step.distance/1000).toFixed(1) + ' км';

  var action = '';
  if(type === 'turn'){
    if(modifier === 'left') action = 'Завийте наляво';
    else if(modifier === 'right') action = 'Завийте надясно';
    else if(modifier === 'slight left') action = 'Леко наляво';
    else if(modifier === 'slight right') action = 'Леко надясно';
    else if(modifier === 'sharp left') action = 'Рязко наляво';
    else if(modifier === 'sharp right') action = 'Рязко надясно';
    else if(modifier === 'uturn') action = 'Обърнете се';
    else action = 'Продължете';
  } else if(type === 'depart') action = 'Тръгнете';
  else if(type === 'arrive') action = 'Пристигнахте';
  else if(type === 'roundabout' || type === 'rotary') action = 'Влезте в кръговото';
  else if(type === 'continue' || type === 'new name') action = 'Продължете';
  else if(type === 'merge') action = 'Влезте в лентата';
  else if(type === 'fork'){
    if(modifier && modifier.includes('left')) action = 'Вземете наляво';
    else action = 'Вземете надясно';
  } else action = 'Продължете';

  var street = step.name ? ' по ' + step.name : '';
  return action + street + ' след ' + dist;
}

var userMarker = null;
var routeLayer = null;

function updateLocation(lat, lng){
  if(!userMarker){
    var userIcon = L.divIcon({
      html:'<div style="background:#2196F3;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.5)"></div>',
      iconSize:[16,16],
      className:''
    });
    userMarker = L.marker([lat,lng],{icon:userIcon}).addTo(map).bindPopup('Вие сте тук');
    map.setView([lat,lng],15);
  } else {
    userMarker.setLatLng([lat,lng]);
  }

  if(role !== "WORKER" || activeBins.length === 0) return;

  var ordered = getOrderedRoute(lat, lng, activeBins);

  if(ordered.length > 0){
    document.getElementById('next-bin').innerText =
      'Следваща: Кошче #' + ordered[0].id + ' — ' + (ordered[0].registeredLocation || '');
  }

  if(routeLayer){ map.removeLayer(routeLayer); routeLayer = null; }

  var coords = [[lng, lat]].concat(
    ordered.map(function(d){
      var c = d.coordinates.split(',');
      return [parseFloat(c[1]), parseFloat(c[0])];
    })
  );
  var coordStr = coords.map(function(c){ return c[0]+','+c[1]; }).join(';');

  fetch('https://router.project-osrm.org/route/v1/driving/' + coordStr + '?overview=full&geometries=geojson&steps=true')
    .then(function(r){ return r.json(); })
    .then(function(data){
      if(!data.routes || data.routes.length === 0) return;

      routeLayer = L.geoJSON(data.routes[0].geometry, {
        style: { color: '#1565C0', weight: 5, opacity: 0.8 }
      }).addTo(map);

      var legs = data.routes[0].legs;
      var stepsHtml = '';
      if(legs && legs[0] && legs[0].steps){
        var steps = legs[0].steps.filter(function(s){ return s.maneuver.type !== 'depart'; });
        if(steps.length > 0){
          stepsHtml = '<div class="step">' + translateStep(steps[0]) + '</div>';
        }
      }
      document.getElementById('steps').innerHTML = stepsHtml;
    })
    .catch(function(err){
      console.warn('OSRM грешка:', err);
    });
}

window.addEventListener('load', function(){
  setTimeout(function(){
    window.ReactNativeWebView.postMessage('MAP_READY');
  }, 500);
});
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

  useEffect(() => {
    if (!mapReady) return;

    const startGPS = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('GPS permission denied');
        return;
      }

      watcherRef.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (pos) => {
          const { latitude, longitude } = pos.coords;
          webviewRef.current?.injectJavaScript(
            `updateLocation(${latitude}, ${longitude}); true;`
          );
        }
      );
    };

    startGPS();

    return () => {
      watcherRef.current?.remove();
    };
  }, [mapReady]);

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
          {mapHtml && (
            <WebView
              ref={webviewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              style={{ flex:1 }}
              onMessage={(event) => {
                if (event.nativeEvent.data === 'MAP_READY') {
                  setMapReady(true);
                }
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}