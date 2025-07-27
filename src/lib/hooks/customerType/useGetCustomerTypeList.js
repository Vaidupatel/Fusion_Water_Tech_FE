import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useGetCustomerTypeList() {
    return useQuery({
        queryKey: ["customerTypes"],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.CUSTOMER_TYPE}/all`);
            return data;
        },
    });
}
