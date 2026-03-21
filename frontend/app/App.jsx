import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import Stats from './pages/Stats.jsx';
import Map from './pages/Map.jsx';
import Update from "./components/update";
import { AuthProvider } from '../context/AuthContext.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}