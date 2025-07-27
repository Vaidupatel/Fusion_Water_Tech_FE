import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";


export function useGetCustomerTypeById(id) {
    return useQuery({
        queryKey: ["customerType", id],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.CUSTOMER_TYPE}/${id}`);
            return data;
        },
        enabled: !!id, // ensures query only runs if ID is present
    });
}
