import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

// Manages which auth modal (login / signup) is currently open.
// Keeping this separate from AuthContext means the nav components
// can open modals without prop-drilling through every screen.
export function UIProvider({ children }) {
    const [modal, setModal] = useState(null); // 'login' | 'signup' | null

    const openLogin  = () => setModal('login');
    const openSignup = () => setModal('signup');
    const closeModal = () => setModal(null);

    return (
        <UIContext.Provider value={{ modal, openLogin, openSignup, closeModal }}>
            {children}
        </UIContext.Provider>
    );
}

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within UIProvider');
    return context;
};