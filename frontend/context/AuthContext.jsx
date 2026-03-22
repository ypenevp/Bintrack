import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('access');
                if (token) {
                    setAuthUser({ token });
                    console.log("Token found, user authenticated");
                } else {
                    console.log("No token found, user not authenticated");
                    setAuthUser(null);
                }
            } catch (error) {
                console.error("Error checking token:", error);
                setAuthUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();
    }, []);

    const login = (userData) => setAuthUser(userData);
    const logout = async () => {
        await AsyncStorage.removeItem('access');
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{ user: authUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};