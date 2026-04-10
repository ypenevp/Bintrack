import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Home        from './pages/Home.jsx';
import Stats       from './pages/Stats.jsx';
import Map         from './pages/Map.jsx';
//import Update      from './components/update';
import FormUpdates from './pages/Admins/Updates.jsx';
import FormUsers   from './pages/Admins/Users.jsx';

import TopNav    from './components/topNav.jsx';
import BottomNav from './components/bottomNav.jsx';
import Login     from './components/logIn.jsx';
import SignUp    from './components/signUp.jsx';
import VerifyCode from './components/verify.jsx';

import { AuthProvider }         from '../context/AuthContext.jsx';
import { UserProvider }         from '../context/UserContext.jsx';
import { UIProvider, useUI }    from '../context/UiContext.jsx';

const Stack = createStackNavigator();

function RootLayout() {
    const navigation = useNavigation();
    const { modal, openLogin, openSignup, openVerify, closeModal } = useUI();

    // ── Route tracking lives here, where navigation is guaranteed ready ──
    // The navigator itself starts on 'Home', so we seed it correctly.
    const [currentRoute, setCurrentRoute] = useState('Home');

    useEffect(() => {
        // Sync immediately, then keep in sync on every navigation change.
        const sync = () => {
            const state = navigation.getState();
            const name = state?.routes[state.index]?.name;
            if (name) setCurrentRoute(name);
        };
        sync();
        const unsub = navigation.addListener('state', sync);
        return unsub;
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            {/* Top nav — receives currentRoute so it never has to guess */}
            <TopNav navigation={navigation} currentRoute={currentRoute} />

            <View style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false, detachInactiveScreens: false }}>
                    <Stack.Screen name="Home"     component={Home} />
                    {/* <Stack.Screen name="Update"   component={Update} /> */}
                    <Stack.Screen name="Stats"    component={Stats} />
                    <Stack.Screen name="Map"      component={Map} />
                    <Stack.Screen name="Updates"  component={FormUpdates} />
                    <Stack.Screen name="Users"    component={FormUsers} />
                </Stack.Navigator>
            </View>

            {/* Bottom nav — same prop */}
            <BottomNav navigation={navigation} currentRoute={currentRoute} />

            {/* ── Login modal ─────────────────────────────────────────────── */}
            <Modal visible={modal === 'login'} transparent animationType="slide" onRequestClose={closeModal}>
                <TouchableOpacity activeOpacity={1} onPress={closeModal}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={{
                                backgroundColor: '#fff', borderTopLeftRadius: 28,
                                borderTopRightRadius: 28, padding: 28, paddingBottom: 40,
                            }}>
                                <Login
                                    onSignUpPress={() => { closeModal(); openSignup(); }}
                                    onLoginSuccess={closeModal}
                                    onClose={closeModal}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            {/* ── Sign-up modal ────────────────────────────────────────────── */}
            <Modal visible={modal === 'signup'} transparent animationType="slide" onRequestClose={closeModal}>
                <TouchableOpacity activeOpacity={1} onPress={closeModal}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={{
                                backgroundColor: '#fff', borderTopLeftRadius: 28,
                                borderTopRightRadius: 28, padding: 28, paddingBottom: 40,
                            }}>
                                <SignUp
                                    onLoginPress={() => { closeModal(); openLogin(); }}
                                    onClose={closeModal}
                                    onShowVerify={() => { closeModal(); openVerify(); }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            <Modal visible={modal === 'verify'} transparent animationType="slide" onRequestClose={closeModal}>
                <TouchableOpacity activeOpacity={1} onPress={closeModal}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <View style={{
                                backgroundColor: 'transparent', padding: 20
                            }}>
                                {/* Когато успее, затваряме верификацията и отваряме Login */}
                                <VerifyCode 
                                    onSuccess={() => { closeModal(); openLogin(); }}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

        </View>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <UIProvider>
                    <NavigationContainer>
                        <RootLayout />
                    </NavigationContainer>
                </UIProvider>
            </UserProvider>
        </AuthProvider>
    );
}