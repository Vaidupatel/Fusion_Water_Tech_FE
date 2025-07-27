import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            return HttpClient.post(API_ENDPOINTS.PRODUCT, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"])
        }
    });
}
