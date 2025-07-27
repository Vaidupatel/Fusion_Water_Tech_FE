import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useGetCustomerList() {
    return useQuery({
        queryKey: ["customers"],
        queryFn: async () => HttpClient.get(API_ENDPOINTS.CUSTOMER),
        onError: (error) => {
            return error;
        },
    });
}


