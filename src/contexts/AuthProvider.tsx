import { useState, createContext, useEffect } from "react";
import type { User } from "@/types";
import { SpinLoading } from "@/base";
import { USER_SESSION_KEY } from "@/configs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

type TAuthContext = {
    user: User | null;
    subscription: null;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: RegisterUserPayload) => Promise<void>;
    logout: () => Promise<void>;
    getTokenSilently: () => Promise<string | null>;
};

type RegisterUserPayload = {
    fullname: string;
    email: string;
    password: string;
    confirmPass: string;
};

const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API,
});

export const AuthContext = createContext<TAuthContext>({
    user: null,
    subscription: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    getTokenSilently: async () => null,
});

const AuthProvider: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

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

            const accessToken = await getTokenSilently();
            if (!accessToken) {
                setUser(null);
                return;
            }
            const profileRes = await authClient.get("/profile", {
                headers: { Authorization: "Bearer " + accessToken },
            });
            setUser(profileRes.data.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await authClient.post("/login", {
                email,
                password,
            });
            const { access_token, refresh_token } = res.data.data;
            sessionStorage.setItem(USER_SESSION_KEY, refresh_token);
            const userRes = await authClient.get("/profile", {
                headers: { Authorization: "Bearer " + access_token },
            });
            setUser(userRes.data.data);
            navigate("/", { preventScrollReset: false, replace: true });
        } catch (err: any) {
            console.error(err.response || err);
        }
    };

    const logout = async () => {};

    const getTokenSilently = async () => {
        try {
            const refreshToken = sessionStorage.getItem(USER_SESSION_KEY);
            if (!refreshToken) return null;
            const res = await authClient.post("/get-access-token", undefined, {
                headers: { Authorization: "Bearer " + refreshToken },
            });
            const { access_token } = res.data.data;
            return access_token as string;
        } catch (err: any) {
            console.error(err.response);
            return null;
        }
    };

    const register = async ({
        fullname,
        email,
        password,
        confirmPass,
    }: RegisterUserPayload) => {
        try {
            await authClient.post("/register", {
                fullname,
                email,
                password,
                confirm_password: confirmPass,
            });
            window.location.reload();
        } catch (err: any) {
            console.error(err.response || err);
        }
    };

    const value = {
        user,
        subscription,
        login,
        register,
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
