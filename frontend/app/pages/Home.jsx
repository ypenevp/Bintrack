import { View, Text, TouchableOpacity, ScrollView, Modal, ImageBackground, Image } from 'react-native';
import "../global.css";
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/bottomNav.jsx';
import TopNav from '../components/topNav.jsx';
import { useState, useEffect } from 'react';
import Login from '../components/logIn.jsx';
import SignUp from '../components/signUp.jsx';
import VerifyCode from '../components/verify.jsx';
import { GetUpdates } from '../services/updates.js';
import Success from '../components/success.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Home({ navigation }) {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [loadingUpdates, setLoadingUpdates] = useState(true);
    const { user } = useAuth();
    const isLoggedIn = !!user;

    const mountainImage = require("../../assets/mountain.png");
    const architectureImage = require("../../assets/architecture.png")
    const inovationImage = require("../../assets/inovation.png")

    const fallbackImages = [
        { title: "Beautiful Mountain Landscape Photography Collection for Nature Enthusiasts", imageSource: mountainImage },
        { title: "Modern Urban Architecture and City Skylines Development Projects Around the World", imageSource: architectureImage },
        { title: "Advanced Technology Innovation and Digital Transformation Solutions for Business Growth", imageSource: inovationImage },
    ];

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                setLoadingUpdates(true);
                const fetchedUpdates = await GetUpdates();
                setUpdates(fetchedUpdates || []);
            } catch (error) {
                console.error('Failed to fetch updates:', error);
                setUpdates([]);
            } finally {
                setLoadingUpdates(false);
            }
        };

        fetchUpdates();
    }, []);

    const handleLoginPress = () => {
        setShowLogin(true);
        setShowSignUp(false);
    };

    const handleSignUpPress = () => {
        setShowSignUp(true);
        setShowLogin(false);
    };

    const handleSwitchToSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const handleSwitchToLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    const handleLoginSuccess = () => {
        setShowLogin(false);
        setShowSignUp(false);
    };

    const closeModals = () => {
        setShowLogin(false);
        setShowSignUp(false);
        setShowVerify(false);
        setShowSuccess(false);
    };

    const handleShowVerify = () => {
        setShowSignUp(false);
        setShowVerify(true);
    };

    const handleVerifySuccess = () => {
        setShowVerify(false);
        setShowSuccess(true);
    };

    const handleSuccessDone = () => {
        setShowSuccess(false);
    };

    

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ flex: 1, height: '100%' }} contentContainerStyle={{ alignItems: 'center' , paddingBottom: 20}}>
                <View
                    style={{
                        minHeight: 500,
                        width: '100%',
                        paddingHorizontal: 30,
                        paddingVertical: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#343635'
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        zIndex: 1,
                        paddingHorizontal: 20
                    }}>

                        <Text style={{
                            fontSize: 47,
                            color: '#ffffff',
                            fontWeight: '800',
                            textAlign: 'center',
                            marginBottom: 10,
                            letterSpacing: -1,
                            lineHeight: 52,
                            textShadowColor: 'rgba(0, 0, 0, 0.3)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 4
                        }}>
                            Bin
                            <Text style={{ color: '#4ade80' }}>Track</Text>
                        </Text>

                        <Text style={{
                            fontSize: 20,
                            color: '#f1f5f9',
                            textAlign: 'center',
                            lineHeight: 30,
                            marginBottom: 40,
                            maxWidth: 380,
                            fontWeight: '400',
                            textShadowColor: 'rgba(0, 0, 0, 0.3)',
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 2
                        }}>
                            Transform your city with AI-powered waste monitoring.
                            Reduce costs by 40% and create cleaner communities.
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: 300,
                            marginBottom: 40,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 16,
                            paddingVertical: 20,
                            paddingHorizontal: 10
                        }}>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: '#4ade80',
                                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 2
                                }}>2</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#e2e8f0',
                                    textAlign: 'center'
                                }}>Smart Bins</Text>

                                <Text style={{ fontSize: 5, color: '#e2e8f0' }}>*one got incinerated by a soldering iron thanks to our expert backend team</Text>

                            </View>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: '#4ade80',
                                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 2
                                }}>60%</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#e2e8f0',
                                    textAlign: 'center'
                                }}>Cost Reduction</Text>
                            </View>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: '#4ade80',
                                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 2
                                }}>24/7</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#e2e8f0',
                                    textAlign: 'center'
                                }}>Monitoring</Text>
                            </View>
                        </View>

                        {!isLoggedIn && (
                            <View style={{ alignItems: 'center', width: '100%' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#15803d',
                                        paddingVertical: 18,
                                        paddingHorizontal: 40,
                                        borderRadius: 30,
                                        shadowColor: '#000',
                                        shadowOpacity: 0.3,
                                        shadowOffset: { width: 0, height: 6 },
                                        shadowRadius: 16,
                                        elevation: 12,
                                        minWidth: 250
                                    }}
                                    onPress={handleSignUpPress}
                                >
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 0.5,
                                        textAlign: 'center'
                                    }}>
                                        Create an Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {isLoggedIn && (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 28,
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                                    textShadowOffset: { width: 0, height: 2 },
                                    textShadowRadius: 4
                                }}>
                                    Welcome back! 🎉
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#e2e8f0',
                                    textAlign: 'center',
                                    maxWidth: 300
                                }}>
                                    You're now ready to manage your smart waste bins efficiently
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    marginTop: -5,
                    marginBottom: 50,
                    backgroundColor: '#f3f3f3',
                    paddingTop: 20,
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginBottom: 25,
                        marginTop: 20,
                        textAlign: 'center',
                    }}>
                        Latest updates
                    </Text>

                    {loadingUpdates ? (
                        <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                            <Text style={{ fontSize: 16, color: '#666' }}>Loading updates...</Text>
                        </View>
                    ) : (
                        <>
                            {(updates.length > 0 ? updates : fallbackImages).map((item, index) => (
                                <TouchableOpacity
                                    key={item.id || index}
                                    style={{ alignItems: 'center' }}
                                    onPress={() => {
                                        if (updates.length > 0) {
                                            navigation.navigate('Update', {
                                                updateId: item.id,
                                                updateData: item
                                            });
                                        } else {
                                            navigation.navigate('Update', {
                                                updateId: index + 1,
                                                updateData: {
                                                    ...item,
                                                    id: index + 1,
                                                    article: item.title
                                                }
                                            });
                                        }
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <View style={{
                                        marginBottom: 20,
                                        alignItems: "center",
                                        backgroundColor: '#fff',
                                        borderRadius: 16,
                                        padding: 16,
                                        elevation: 4,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        width: 350,
                                    }}>

                                        <View style={{
                                            width: 300,
                                            height: 150,
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: 16,
                                            overflow: 'hidden'
                                        }}>
                                            <Image
                                                source={
                                                    item.picture
                                                        ? { uri: item.picture } 
                                                        : item.imageSource     
                                                }
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                resizeMode='cover'
                                            />
                                        </View>

                                        <View style={{
                                            padding: 10,
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: '#1f2937'
                                            }}>
                                                {item.title}
                                            </Text>
                                            {item.article && (
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    marginTop: 8,
                                                    textAlign: 'center',
                                                    numberOfLines: 3
                                                }}>
                                                    {item.article}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            {/* <BottomNav navigation={navigation} /> */}

            {showLogin && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        onPress={closeModals}
                        activeOpacity={1}
                    />
                    <View style={{
                        width: '90%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        borderRadius: 24,
                        padding: 40,
                        shadowColor: '#000',
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 20,
                    }}>
                        <Login
                            onSignUpPress={handleSwitchToSignUp}
                            onLoginSuccess={handleLoginSuccess}
                            onClose = {closeModals}
                        />
                    </View>
                </View>
            )}

            {showSignUp && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        onPress={closeModals}
                        activeOpacity={1}
                    />
                    <View style={{
                        width: '90%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        borderRadius: 24,
                        padding: 40,
                        shadowColor: '#000',
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 20,
                    }}>
                        <SignUp
                            onLoginPress={handleSwitchToLogin}
                            onShowVerify={handleShowVerify}
                            onClose={closeModals}
                        />
                    </View>
                </View>
            )}

            {showVerify && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <VerifyCode onSuccess={handleVerifySuccess} />
                </View>
            )}

            {showSuccess && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Success onDone={handleSuccessDone} />
                </View>
            )}
            
        </View>
    );
}