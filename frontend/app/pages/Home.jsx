import { View, Text, TouchableOpacity } from 'react-native';
import "../global.css";

export default function Home({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text className="text-red-500 font-bold italic">Open up App.js to start working on your app!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text className="text-blue-500 font-bold">Go to Settings</Text>
            </TouchableOpacity>
        </View>
    );
}