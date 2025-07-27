import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, formData }) => {
            return HttpClient.put(`${API_ENDPOINTS.PRODUCT}/${id}`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products", "product"])
        }
    });
}
