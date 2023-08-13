import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const [signupMode, setSignupMode] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (signupMode) {
            // sign up
        } else {
            // login
        }
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
                        required
                        placeholder="e.g. john@example.com"
                        autoComplete="current-email"
                    />
                </div>
                <div className="input-controller">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </div>
                {signupMode && (
                    <div className="input-controller">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            name="password"
                            type="password"
                            required
                            placeholder="Reenter your password"
                            autoComplete="false"
                        />
                    </div>
                )}
                <button type="submit" className="btn-primary btn-lg">
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
