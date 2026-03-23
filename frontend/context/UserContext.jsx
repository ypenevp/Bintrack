// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GetUserDetails } from '../app/services/userDetails.js';
// import { useAuth } from './AuthContext.jsx';

// const UserContext = createContext(null);

// export function UserProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const { user: authUser, isLoading: authLoading } = useAuth();

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 if (authLoading) {
//                     console.log("Auth loading in progress, skipping user details fetch");
//                     return;
//                 }
//                 if (authUser) {
//                     const token = await AsyncStorage.getItem('access');
//                     if (token) {
//                         const userDetails = await GetUserDetails();
//                         setUser(userDetails);
//                         console.log("User details loaded:", userDetails);
//                     } else {
//                         console.log("No token found, user not authenticated");
//                         setUser(null);
//                     }
//                 } else {
                    
//                     console.log("No authenticated user, user details cleared");
//                     setUser(null);
//                 }
//             } catch (error) {
//                 console.error("Error loading user details:", error);
//                 setUser(null);
//             }
//         };

//         fetchUserDetails();
//     }, [authUser, authLoading]);

//     const value = {
//         user,
//     };

//     return (
//         <UserContext.Provider value={value}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUser must be used within UserProvider');
//     }
//     return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserDetails } from '../app/services/userDetails.js';
import { useAuth } from './AuthContext.jsx';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const { user: authUser, isLoading: authLoading } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (authLoading) return;
                if (authUser) {
                    const token = await AsyncStorage.getItem('access');
                    if (token) {
                        const userDetails = await GetUserDetails();
                        setUser(userDetails);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error loading user details:', error);
                setUser(null);
            }
        };
        fetchUserDetails();
    }, [authUser, authLoading]);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};