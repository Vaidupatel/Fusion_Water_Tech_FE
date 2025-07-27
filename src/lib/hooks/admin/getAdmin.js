import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";


export function useGetAdminProfile() {
    return useQuery({
        queryKey: ["GetAdminProfile"],
        queryFn: async () => HttpClient.get(API_ENDPOINTS.ADMIN_GET_PROFILE),
        onError: (error) => {
            return error;
        },
    });
}

