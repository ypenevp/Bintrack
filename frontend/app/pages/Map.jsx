import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import TopNav from '../components/topNav.jsx';
import BottomNav from '../components/bottomNav.jsx';

const { width: SW } = Dimensions.get('window');
const PAD = 16;

const DUMPSTERS = [
    { id: 'A', name: 'Dumpster A', lat: 42.6977, lng: 23.3219, fill: 75 },
    { id: 'B', name: 'Dumpster B', lat: 42.7000, lng: 23.3300, fill: 45 },
    { id: 'C', name: 'Dumpster C', lat: 42.6950, lng: 23.3150, fill: 90 },
    { id: 'D', name: 'Dumpster D', lat: 42.6920, lng: 23.3280, fill: 30 },
];

const COLORS = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0'];

// Map HTML — all 4 dumpsters as coloured markers

const mapHtml = `<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>body{margin:0}#map{height:100vh;width:100%}</style>
</head><body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([42.6963, 23.3237], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '© OpenStreetMap' }).addTo(map);

    var dumpsters = ${JSON.stringify(DUMPSTERS)};
    var colors    = ${JSON.stringify(COLORS)};

    dumpsters.forEach(function(d, i) {
      var icon = L.divIcon({
        className: '',
        html: '<div style="background:' + colors[i] + ';width:30px;height:30px;border-radius:50%;'
            + 'border:3px solid white;display:flex;align-items:center;justify-content:center;'
            + 'color:white;font-weight:bold;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.4)">'
            + d.id + '</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      var marker = L.marker([d.lat, d.lng], { icon: icon }).addTo(map);
      marker.bindPopup('<b>' + d.name + '</b><br>Fill level: <b>' + d.fill + '%</b>');
      marker.on('click', function() {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'marker_click', dumpster: d.id, fill: d.fill })
        );
      });
    });
  </script>
</body></html>`;

// Small shared UI components

function SectionTitle({ title, subtitle }) {
    return (
        <View style={{ paddingHorizontal: PAD, paddingTop: 24, paddingBottom: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>{title}</Text>
            {subtitle ? (
                <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{subtitle}</Text>
            ) : null}
        </View>
    );
}

// Main screen

export default function Map({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <TopNav navigation={navigation} /> */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 0 }}
                nestedScrollEnabled
            >
                {/* ── Map ───────────────────────────────── */}
                <SectionTitle title="Dumpster Locations" />
                <View style={{
                    marginHorizontal: PAD,
                    shadowColor: '#15803d',
                    shadowOpacity: 0.8,
                    shadowRadius: 14,
                    elevation: 18,
                }}>
                    <View style={{
                        borderRadius: 14,
                        overflow: 'hidden',
                        height: 540,
                        backgroundColor: '#fff',
                    }}>
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: mapHtml }}
                            style={{ flex: 1 }}
                            scrollEnabled={false}
                            onMessage={(event) => {
                                const data = JSON.parse(event.nativeEvent.data);
                                console.log('Marker clicked:', data);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
