import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SpinLoading } from "@/base";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [fullname, setFullname] = useState("");
    const [signupMode, setSignupMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (signupMode) {
            await register({ email, fullname, password, confirmPass });
        } else {
            await login(email, password);
        }
        setLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 gap-6">
            <h2 className="font-black">FineTrack</h2>
            <form
                action="submit"
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4 rounded-lg border p-6 max-w-lg"
            >
                <div className="input-controller">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required
                        placeholder="e.g. john@example.com"
                        autoComplete="current-email"
                        disabled={loading}
                    />
                </div>
                <div className="input-controller">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </div>
                {signupMode && (
                    <>
                        <div className="input-controller">
                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="password"
                                type="password"
                                required
                                value={confirmPass}
                                onChange={(e) =>
                                    setConfirmPass(e.currentTarget.value)
                                }
                                placeholder="Reenter your password"
                                autoComplete="false"
                                disabled={loading}
                            />
                        </div>
                        <div className="input-controller">
                            <label htmlFor="fullname">Fullname</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                value={fullname}
                                onChange={(e) =>
                                    setFullname(e.currentTarget.value)
                                }
                                placeholder="e.g. John Doe"
                                autoComplete="name"
                                disabled={loading}
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className="btn-primary btn-lg"
                    disabled={loading}
                >
                    {loading && <SpinLoading />}
                    {signupMode ? "Sign Up" : "Login"}
                </button>
            </form>

            <div className="text-sm">
                <div>
                    {signupMode ? "Already" : "Don't"} have an account?{" "}
                    <button
                        className="text-textPrimary font-medium"
                        onClick={() => setSignupMode((p) => !p)}
                    >
                        {signupMode ? "Login" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
