import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    clearCreatorSession,
    getCreatorMe,
    hasCreatorSession,
    signInWithGoogle,
} from '../lib/cabinetApi.js';

const CabinetAuthContext = createContext(null);

export const useCabinetAuth = () => {
    const value = useContext(CabinetAuthContext);
    if (!value) throw new Error('useCabinetAuth must be used inside CabinetAuthProvider');
    return value;
};

export function CabinetAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        const current = await getCreatorMe();
        if (current.account_kind !== 'creator') throw new Error('This is not a creator account');
        setUser(current);
        return current;
    }, []);

    useEffect(() => {
        let active = true;
        const initialize = async () => {
            if (!hasCreatorSession()) {
                if (active) setLoading(false);
                return;
            }
            try {
                const current = await getCreatorMe();
                if (active && current.account_kind === 'creator') setUser(current);
                if (current.account_kind !== 'creator') clearCreatorSession();
            } catch {
                clearCreatorSession();
            } finally {
                if (active) setLoading(false);
            }
        };
        initialize();
        return () => { active = false; };
    }, []);

    const googleLogin = useCallback(async (credential) => {
        await signInWithGoogle(credential);
        return loadUser();
    }, [loadUser]);

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
