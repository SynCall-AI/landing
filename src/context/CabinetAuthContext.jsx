import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    activateCreatorStudio,
    clearCreatorSession,
    CREATOR_SESSION_CLEARED_EVENT,
    getCreatorMe,
    hasCreatorSession,
    signInWithGoogle,
} from '../lib/cabinetApi.js';

const CabinetAuthContext = createContext(null);

const hasCreatorAccess = (user) => (
    Array.isArray(user?.enabled_products)
        ? user.enabled_products.includes('creator')
        : user?.account_kind === 'creator'
);

const loadCreatorIdentity = async () => {
    let current = await getCreatorMe();
    if (!hasCreatorAccess(current)) {
        await activateCreatorStudio();
        current = await getCreatorMe();
    }
    if (!hasCreatorAccess(current)) throw new Error('Creator Studio activation failed');
    return current;
};

export const useCabinetAuth = () => {
    const value = useContext(CabinetAuthContext);
    if (!value) throw new Error('useCabinetAuth must be used inside CabinetAuthProvider');
    return value;
};

export function CabinetAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        const current = await loadCreatorIdentity();
        setUser(current);
        return current;
    }, []);

    useEffect(() => {
        const clearUser = () => setUser(null);
        window.addEventListener(CREATOR_SESSION_CLEARED_EVENT, clearUser);
        return () => window.removeEventListener(CREATOR_SESSION_CLEARED_EVENT, clearUser);
    }, []);

    useEffect(() => {
        let active = true;
        const initialize = async () => {
            if (!hasCreatorSession()) {
                if (active) setLoading(false);
                return;
            }
            try {
                const current = await loadCreatorIdentity();
                if (active) setUser(current);
            } catch {
                clearCreatorSession();
            } finally {
                if (active) setLoading(false);
            }
        };
        initialize();
        return () => { active = false; };
    }, []);

    const finishLogin = useCallback(async (request) => {
        await request();
        try {
            return await loadUser();
        } catch (error) {
            clearCreatorSession();
            throw error;
        }
    }, [loadUser]);

    const googleLogin = useCallback((credential, intent = 'login') => (
        finishLogin(() => signInWithGoogle(credential, intent))
    ), [finishLogin]);

    const logout = useCallback(() => {
        clearCreatorSession();
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: Boolean(user),
        googleLogin,
        logout,
        refreshUser: loadUser,
    }), [googleLogin, loadUser, loading, logout, user]);

    return <CabinetAuthContext.Provider value={value}>{children}</CabinetAuthContext.Provider>;
}
