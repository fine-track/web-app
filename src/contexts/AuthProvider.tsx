import { useState, createContext, useEffect } from "react";
import type { User } from "@/types";
import { SpinLoading } from "@/base";
import { USER_SESSION_KEY } from "@/configs";
import { useNavigate, useLocation } from "react-router-dom";
import { authClient } from "@/utils/http";
import { getTokenSilently } from "@/utils/auth";

type TAuthContext = {
    user: User | null;
    subscription: null;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: RegisterUserPayload) => Promise<void>;
    logout: () => Promise<void>;
};

type RegisterUserPayload = {
    fullname: string;
    email: string;
    password: string;
    confirmPass: string;
};

export const AuthContext = createContext<TAuthContext>({
    user: null,
    subscription: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
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
        if (
            location.pathname.includes("/login") ||
            location.pathname.includes("/logout")
        ) {
            setLoading(false);
            return;
        }
        silentLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const silentLogin = async () => {
        let foundUser: User | null = null;
        try {
            setLoading(true);
            setSubscription(null);

            const accessToken = await getTokenSilently();
            if (!accessToken) {
                foundUser = null;
            } else {
                const profileRes = await authClient.get("/profile", {
                    headers: { Authorization: "Bearer " + accessToken },
                });
                foundUser = profileRes.data.data;
            }
        } catch (err) {
            sessionStorage.removeItem(USER_SESSION_KEY);
            foundUser = null;
        } finally {
            setUser(foundUser);
            if (!foundUser) navigate("/login");
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
            navigate("/journals", { preventScrollReset: false, replace: true });
        } catch (err: any) {
            console.error(err.response || err);
        }
    };

    const logout = async () => {
        try {
            const accessToken = await getTokenSilently();
            if (accessToken) {
                await authClient.post("/logout", undefined, {
                    headers: { Authorization: "Bearer " + accessToken },
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
            navigate("/login");
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
