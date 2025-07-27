import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useUpdateCustomerType() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }) => {
            return HttpClient.put(`${API_ENDPOINTS.CUSTOMER_TYPE}/${id}`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["customerTypes", "customerType"])
        }
    });
}
