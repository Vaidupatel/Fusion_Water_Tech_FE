import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";


export function useGetProductById(id) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.PRODUCT}/${id}`);
            return data;
        },
        enabled: !!id,
    });
}
