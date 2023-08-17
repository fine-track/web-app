import axios from "axios";
import { getTokenSilently } from "./auth";

export const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API,
});

export const https = async () => {
    const accessToken = await getTokenSilently();
    if (!accessToken) {
        throw new Error("Unable to verify session please login again.");
    }
    return axios.create({
        baseURL: import.meta.env.VITE_AIP_URL,
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
        },
    });
};

export const http = () =>
    axios.create({
        baseURL: import.meta.env.VITE_AIP_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
