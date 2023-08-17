import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/modules/auth/LoginPage";
import LogoutPage from "@/modules/auth/LogoutPage";
import Dashboard from "@/modules/dashboard/Dashboard";
import JournalsPlage from "@/modules/journals/JournalsPlage";
import LedgersPage from "@/modules/ledgers/LedgersPage";
import PlansPage from "@/modules/plans/PlansPage";
import PreferencesPage from "@/modules/preferences/PreferencesPage";

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
            {
                path: "/journals",
                element: <JournalsPlage />,
            },
            {
                path: "/ledgers",
                element: <LedgersPage />,
            },
            {
                path: "/plans",
                element: <PlansPage />,
            },
            {
                path: "/preferences",
                element: <PreferencesPage />,
            },

            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
