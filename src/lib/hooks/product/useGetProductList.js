import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useGetProductList() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.PRODUCT}/all`);
            return data;
        },
    });
}
