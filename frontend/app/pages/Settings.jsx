import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Modal,
} from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import "../global.css";
import TopNav from '../components/topNav.jsx';
import BottomNav from '../components/bottomNav.jsx';
import PersonalInfoModal from '../components/PersonalInfo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUser } from '../../context/UserContext.jsx';

const mockUser = {
    name: 'Borislav Stoinev',
    email: 'borislav@example.com',
    role: 'Random User',
};

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Български', value: 'bg' },
    { label: 'Русский', value: 'ru' },
    { label: 'Deutsch', value: 'de' },
];

const SettingRow = ({ icon, label, value, trailing, onPress, destructive, isCheckbox, isChecked, onCheckChange }) => (
    <TouchableOpacity
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 14,
            gap: 14,
            ...(destructive && { justifyContent: 'center' })
        }}
        onPress={isCheckbox ? () => onCheckChange(!isChecked) : onPress}
        activeOpacity={0.7}
    >
        <View style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            backgroundColor: destructive ? 'rgba(239,68,68,0.1)' : 'rgba(107,114,128,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {icon}
        </View>

        <Text style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '500',
            color: destructive ? '#ef4444' : '#111827',
        }}>
            {label}
        </Text>

        {value && !isCheckbox && !trailing && (
            <Text style={{
                fontSize: 14,
                color: '#9ca3af',
                marginRight: 4,
            }}>
                {value}
            </Text>
        )}

        {trailing}

        {!trailing && !destructive && isCheckbox && (
            <View style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: isChecked ? '#3b82f6' : '#d1d5db',
                backgroundColor: isChecked ? '#3b82f6' : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {isChecked && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                )}
            </View>
        )}

        {!trailing && !destructive && !isCheckbox && (
            <Ionicons name="chevron-forward" size={18} color="#a0a0a0" />
        )}
    </TouchableOpacity>
);

const SectionTitle = ({ children }) => (
    <Text style={{
        fontSize: 12,
        fontWeight: '700',
        color: '#9ca3af',
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 4,
    }}>
        {children}
    </Text>
);

export default function Settings({ navigation }) {
    const [profileImage, setProfileImage] = useState(null);
    const [showPersonalInfo, setShowPersonalInfo] = useState(false);

    const { user: authUser, logout } = useAuth();
    const { user: userDetails } = useUser();
    const isLoggedIn = !!authUser;


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSignOut = async () => {
        await logout();
        navigation.navigate('Home');
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>

            <ScrollView
                scrollEnabled={true}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 48,
                    paddingBottom: 50,
                }}
            >
                <View style={{
                    alignItems: 'center',
                    marginBottom: 32,
                }}>
                    <View style={{ position: 'relative', marginBottom: 16, marginTop: -15 }}>
                        <Image
                            source={
                                profileImage
                                    ? { uri: profileImage }
                                    : require('../../assets/defaultIcon.jpg')
                            }
                            style={{
                                width: 128,
                                height: 128,
                                borderRadius: 64,
                                borderWidth: 4,
                                borderColor: '#fff',
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: '#3b82f6',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 4,
                                elevation: 4,
                            }}
                            onPress={pickImage}
                        >
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* User Info */}
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: '#111827',
                        letterSpacing: -0.5,
                    }}>
                        {userDetails?.username || mockUser.name}
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        color: '#6b7280',
                        marginTop: 2,
                    }}>
                        {userDetails?.email || mockUser.email}
                    </Text>

                    <View style={{
                        marginTop: 8,
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        paddingHorizontal: 12,
                        paddingVertical: 3,
                        borderRadius: 999,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: '#3b82f6',
                        }}>
                            {userDetails?.role || mockUser.role}
                        </Text>
                    </View>
                </View>

                <SectionTitle>ACCOUNT</SectionTitle>
                <View style={{
                    borderRadius: 16,
                    marginBottom: 16,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 3,
                    elevation: 1,
                }}>
                    <SettingRow
                        icon={<Feather name="user" size={18} color="#6b7280" />}
                        label="Personal Information"
                        value={userDetails?.username || mockUser.name}
                        onPress={() => setShowPersonalInfo(true)}
                    />
                    <View style={{
                        height: 1,
                        backgroundColor: '#f3f4f6',
                        marginLeft: 56,
                    }} />

                {isLoggedIn && (
                    <View style={{
                        borderRadius: 16,
                        marginTop: 12,
                        marginBottom: 16,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.04,
                        shadowRadius: 3,
                        elevation: 1,
                    }}>
                        <SettingRow
                            icon={<Feather name="log-out" size={18} color="#ef4444" />}
                            label="Sign Out"
                            destructive
                            onPress={handleSignOut}
                        />
                    </View>
                )}

                </View>
            </ScrollView>

            <PersonalInfoModal
                visible={showPersonalInfo}
                onClose={() => setShowPersonalInfo(false)}
            />

        </View>
    );
}