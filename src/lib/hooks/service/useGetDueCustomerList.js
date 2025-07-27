import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useGetDueCustomerList() {
    return useQuery({
        queryKey: ["dueServices"],
        queryFn: async () => HttpClient.get(`${API_ENDPOINTS.DUE_SERVICE}/due`),
        onError: (error) => {
            return error;
        },
    });
}


