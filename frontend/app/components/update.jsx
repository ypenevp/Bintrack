import { View, Text, TouchableOpacity } from 'react-native';
import "../global.css";
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/bottomNav.jsx';
import TopNav from '../components/topNav.jsx';

export default function Update({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TopNav navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <Text className="text-green-500 font-bold italic">This is the update details page!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text className="text-blue-500 font-bold">Go to Home</Text>
                </TouchableOpacity>
            </View>
            <BottomNav navigation={navigation} />
        </View>
    );
}