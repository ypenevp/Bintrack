import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import TopNav from '../components/topNav.jsx';
import BottomNav from '../components/bottomNav.jsx';
import { useNavigation } from '@react-navigation/native';

export default function Map({ navigation }) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        body { margin: 0; }
        #map { height: 80vh; width: 90vw; border: 6px solid green; border-radius: 16px; }
        #mapcontainer { display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 24px;}
      </style>
    </head>
    <body>
      <div id="mapcontainer">
        <div id="map"></div>
      </div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([42.6977, 23.3219], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const marker = L.marker([42.6977, 23.3219]).addTo(map);
        marker.bindPopup("This is the masterdumpster! Bow all thee before me!");
        marker.on('click', function () {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'marker_click', city: 'Sofia' })
          );
        });
      </script>
    </body>
    </html>
  `;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TopNav navigation={navigation} />
            <Text className="text-green-500 font-bold italic">This is the Map page!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text className="text-blue-500 font-bold">Go to Home</Text>
            </TouchableOpacity>
            <WebView
                originWhitelist={['*']}
                source={{ html }}
                style={{ flex: 1 }}
                onMessage={(event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    console.log("Marker clicked:", data);
                }}
            />
            <BottomNav navigation={navigation} />
        </View>
    );
}