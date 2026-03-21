import "../global.css";
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
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function seededRand(seed) {
    let s = seed;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// 7 days × 4 readings (every 6 hours) = 28 data points per dumpster
const TIME_SERIES = DUMPSTERS.map((d, idx) => {
    const rand = seededRand(idx * 137 + 42);
    const data = [];
    let v = d.fill * 0.4;
    for (let i = 0; i < 28; i++) {
        v = Math.min(100, Math.max(5, v + rand() * 18 - 4));
        if (i % 16 === 15) v = Math.max(5, v - 55); // simulate emptying
        data.push(Math.round(v));
    }
    return { name: d.name, data };
});

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

// Chart.js 1 — Bar chart: current fill levels

const CJS_BAR_H = 340;

const cjsBarHtml = `<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; font-family: sans-serif; }
    #wrapper { width: 100vw; height: ${CJS_BAR_H}px; }
    canvas { width: 100% !important; height: 100% !important; display: block; }
  </style>
</head><body>
  <div id="wrapper"><canvas id="c"></canvas></div>
  <script>
    var canvas = document.getElementById('c');
    canvas.width  = window.innerWidth;
    canvas.height = ${CJS_BAR_H};
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(DUMPSTERS.map(d => d.name))},
        datasets: [{
          label: 'Fill Level (%)',
          data: ${JSON.stringify(DUMPSTERS.map(d => d.fill))},
          backgroundColor: ${JSON.stringify(COLORS.map(c => c + 'BB'))},
          borderColor: ${JSON.stringify(COLORS)},
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Current Dumpster Fill Levels',
            font: { size: 15, weight: 'bold' },
            padding: { bottom: 12 },
          }
        },
        scales: {
          y: {
            min: 0, max: 100,
            title: { display: true, text: 'Fill Level (%)' },
            grid: { color: '#f0f0f0' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  </script>
</body></html>`;

// Chart.js 2 — Line chart: fill over 1 week

const CJS_LINE_H = 420;
const CJS_LINE_W = 1400;

const cjsLineHtml = `<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; font-family: sans-serif; }
    #scroll { width: 100vw; height: ${CJS_LINE_H}px; overflow-x: auto; overflow-y: hidden; }
    #inner  { width: ${CJS_LINE_W}px; height: ${CJS_LINE_H}px; }
    canvas  { display: block; }
  </style>
</head><body>
  <div id="scroll"><div id="inner"><canvas id="c"></canvas></div></div>
  <script>
    var canvas = document.getElementById('c');
    canvas.width  = ${CJS_LINE_W};
    canvas.height = ${CJS_LINE_H};

    var days  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var times = ['00:00','06:00','12:00','18:00'];
    var labels = [];
    days.forEach(function(d) { times.forEach(function(t) { labels.push(d + ' ' + t); }); });

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: ${JSON.stringify(
            TIME_SERIES.map((s, i) => ({
                label: s.name,
                data: s.data,
                borderColor: COLORS[i],
                backgroundColor: COLORS[i] + '22',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2.5,
                fill: false,
            }))
        )}
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          title: {
            display: true,
            text: 'Fill Level Over Time — 1 Week (every 6 h)',
            font: { size: 15, weight: 'bold' },
            padding: { bottom: 12 },
          },
          legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12 } }
        },
        scales: {
          y: {
            min: 0, max: 100,
            title: { display: true, text: 'Fill Level (%)' },
            grid: { color: '#f0f0f0' }
          },
          x: {
            ticks: { maxRotation: 45, font: { size: 11 } },
            grid: { color: '#f0f0f0' }
          }
        }
      }
    });
  </script>
</body></html>`;

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

function Legend() {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: PAD, marginBottom: 10, gap: 10 }}>
            {DUMPSTERS.map((d, i) => (
                <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS[i] }} />
                    <Text style={{ fontSize: 12, color: '#444' }}>{d.name}</Text>
                </View>
            ))}
        </View>
    );
}

export default function Stats({ navigation }) {

    const giftedBarData = DUMPSTERS.map((d, i) => ({
        value: d.fill,
        label: d.name.replace('Dumpster ', ''),
        frontColor: COLORS[i],
        topLabelComponent: () => (
            <Text style={{ fontSize: 10, color: '#333', marginBottom: 2 }}>{d.fill}%</Text>
        ),
    }));

    const giftedLineDataSets = TIME_SERIES.map((s, i) => ({
        data: s.data.map(v => ({ value: v })),
        color: COLORS[i],
        thickness: 2,
        hideDataPoints: true,
    }));
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TopNav navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 82 }}
                nestedScrollEnabled
            >
                <Text className="text-green-500 font-bold italic">This is the Stats page!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text className="text-blue-500 font-bold">Go to Home</Text>
                </TouchableOpacity>

                {/* ── Chart.js Bar ───────────────────────── */}
                <SectionTitle
                    title="Fill Levels — Chart.js Bar"
                    subtitle="Current snapshot per dumpster"
                />
                <View style={{
                    marginHorizontal: PAD,
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    height: CJS_BAR_H,
                    backgroundColor: '#fff',
                }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: cjsBarHtml }}
                        style={{ flex: 1 }}
                        scrollEnabled={false}
                    />
                </View>

                {/* ── Chart.js Line ──────────────────────── */}
                <SectionTitle
                    title="Fill Over Time — Chart.js Line"
                    subtitle="Every 6 hours for 1 week (28 readings)"
                />
                <View style={{
                    marginHorizontal: PAD,
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    height: CJS_LINE_H,
                    backgroundColor: '#fff',
                }}>
                    {/* scrollEnabled lets the user pan left/right through all 28 readings */}
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: cjsLineHtml }}
                        style={{ flex: 1 }}
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* ── Gifted Bar ─────────────────────────── */}
                <SectionTitle
                    title="Fill Levels — Gifted Charts Bar"
                    subtitle="Current snapshot per dumpster"
                />
                <View style={{ paddingHorizontal: PAD, paddingTop: 16 }}>
                    <BarChart
                        data={giftedBarData}
                        barWidth={52}
                        spacing={20}
                        roundedTop
                        xAxisThickness={1}
                        yAxisThickness={1}
                        yAxisTextStyle={{ fontSize: 10, color: '#777' }}
                        xAxisLabelTextStyle={{ fontSize: 10, color: '#555' }}
                        noOfSections={5}
                        maxValue={100}
                        showValuesAsTopLabel={false}
                        isAnimated
                        animationDuration={600}
                        width={SW - PAD * 2 - 40}
                    />
                </View>

                {/* ── Gifted Line ─────────────────────────── */}
                <SectionTitle
                    title="Fill Over Time — Gifted Charts Line"
                    subtitle="Every 6 hours for 1 week (28 readings)"
                />
                <Legend />
                <View style={{ paddingHorizontal: PAD, paddingTop: 8 }}>
                    <LineChart
                        dataSet={giftedLineDataSets}
                        width={SW - PAD * 2 - 40}
                        height={200}
                        noOfSections={5}
                        maxValue={100}
                        yAxisTextStyle={{ fontSize: 10, color: '#777' }}
                        xAxisLabelTexts={TIME_SERIES[0].data.map((_, i) =>
                            i % 4 === 0 ? DAYS[Math.floor(i / 4)] : ''
                        )}
                        xAxisLabelTextStyle={{ fontSize: 9, color: '#555' }}
                        xAxisThickness={1}
                        yAxisThickness={1}
                        curved
                        isAnimated
                        animationDuration={800}
                    />
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} />
        </View>
    );
}