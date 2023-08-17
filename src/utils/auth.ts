import dayjs from "dayjs";
import { USER_SESSION_KEY, USER_ACCESS_TOKEN_KEY } from "@/configs";
import { authClient } from "./http";

const EXPIRE_TIME = 59 * 60 * 1000;

export const getTokenSilently = async () => {
    try {
        const refreshToken = sessionStorage.getItem(USER_SESSION_KEY);
        if (!refreshToken) return null;
        // first check for locally stored access token
        const accessTokenStr = sessionStorage.getItem(USER_ACCESS_TOKEN_KEY);
        if (accessTokenStr && accessTokenStr !== "") {
            const data = JSON.parse(accessTokenStr) as {
                accessToken: string;
                exp: string;
            };
            if (dayjs(data.exp).isAfter(Date.now(), "s")) {
                return data.accessToken;
            }
        }

        const res = await authClient.post("/get-access-token", undefined, {
            headers: { Authorization: "Bearer " + refreshToken },
        });
        const { access_token } = res.data.data;
        sessionStorage.setItem(
            USER_ACCESS_TOKEN_KEY,
            JSON.stringify({
                accessToken: access_token,
                exp: new Date(Date.now() + EXPIRE_TIME).toISOString(),
            }),
        );
        return access_token as string;
    } catch (err: any) {
        console.error(err.response);
        return null;
    }
};
