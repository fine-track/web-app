import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "@/contexts/AuthProvider";
import AppBar from "@/modules/navbars/AppBar";
import BottomBar from "@/modules/navbars/BottomBar";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <main className="w-full max-w-[100vw] min-h-screen h-max overflow-hidden py-[60px] bg-white">
                <AppBar />
                <BottomBar />
                <Outlet />
            </main>
        </AuthProvider>
    );
};

export default App;
