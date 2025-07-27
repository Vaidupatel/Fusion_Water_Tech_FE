import Cookies from "js-cookie";
import { AUTH_LOCAL_ROLE, AUTH_ROLE, AUTH_TOKEN_KEY } from "../../constants/tokenKey";

export function useToken() {
    return {
        setToken(token) {
            Cookies.set(AUTH_TOKEN_KEY, token, { expires: 36500 });
        },

        setRole(role) {
            Cookies.set(AUTH_ROLE, role, { expires: 36500 });
        },

        setUserRole(userRole) {
            localStorage.setItem(AUTH_LOCAL_ROLE, userRole);
        },

        getToken() {
            return Cookies.get(AUTH_TOKEN_KEY);
        },

        removeToken() {
            Cookies.remove(AUTH_TOKEN_KEY);
        },

        hasToken() {
            const token = Cookies.get(AUTH_TOKEN_KEY);
            return !!token;
        },
    };
}

export function checkIsLoggedIn() {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    return !!token;
}