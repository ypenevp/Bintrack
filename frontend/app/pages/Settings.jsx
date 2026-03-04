import { View, Text, TouchableOpacity } from 'react-native';
import "../global.css";

export default function Settings({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text className="text-red-500 font-bold italic">Settings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text className="text-blue-500 font-bold">Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}