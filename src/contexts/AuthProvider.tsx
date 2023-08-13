import { useState, createContext, useEffect } from "react";
import { SpinLoading } from "@/base";
import { USER_SESSION_KEY } from "@/configs";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext({
    user: null,
    subscription: null,
    login: async () => {},
    logout: async () => {},
    getTokenSilently: async () => {},
});

const AuthProvider: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        silentLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loading || user) return;
        if (location.pathname === "/login") return;
        if (location.pathname === "/logout") return;
        window.location.href = "/login";
    }, [user, loading, location]);

    const silentLogin = async () => {
        try {
            setLoading(true);
            setSubscription(null);

            const session = sessionStorage.getItem(USER_SESSION_KEY);
            if (!session) {
                setUser(null);
                return;
            }
            const tokenData = JSON.parse(session);
            if (!tokenData.refreshToken) {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {};

    const logout = async () => {};

    const getTokenSilently = async () => {};

    const value = {
        user,
        subscription,
        login,
        logout,
        getTokenSilently,
    };

    if (loading)
        return (
            <div className="fixed top-0 right-0 bottom-0 left-0 z-[999] bg-white p-6 flex justify-center items-center">
                <div className="w-full max-w-lg border border-gay-100 rounded-lg p-4 flex flex-col justify-center items-center">
                    <h4>Authenticating</h4>
                    <p>Please wait</p>
                    <SpinLoading size="lg" className="mt-4" />
                </div>
            </div>
        );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
export default AuthProvider;
