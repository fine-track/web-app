import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/modules/auth/LoginPage";
import LogoutPage from "@/modules/auth/LogoutPage";

import "@/styles/index.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement:
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/logout",
                element: <LogoutPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
