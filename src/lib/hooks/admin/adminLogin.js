import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";
export function useAdminLogin() {
    return useMutation({
        mutationFn: async (credentials) => {
            return HttpClient.post(`${API_ENDPOINTS.ADMIN_LOGIN}`, credentials);
        },
    });
}
