import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../config/routes";
import { useToken } from "../../utils/auth";
import { clearLocalStorage } from "../../utils/localStorage";
export function useAdminLogout() {
    const { removeToken } = useToken()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async () => {
            return HttpClient.get(`${API_ENDPOINTS.ADMIN_LOGOUT}`);
        },
        onSuccess: (data) => {
            localStorage.clear();
            removeToken()
            clearLocalStorage()
            navigate(Routes.logout)
            window.location.reload();
        },
        onError: (error) => {
            if (error?.status === 401) {
                localStorage.clear();
                removeToken()
                clearLocalStorage()
                navigate(Routes.logout)
                window.location.reload();
            }
            console.log("error", error);
        },

    });
}
