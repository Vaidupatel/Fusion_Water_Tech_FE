import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useUpdateCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, body }) => {
            return HttpClient.put(`${API_ENDPOINTS.CUSTOMER}/${id}`, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["customers", "customer"])
        }
    });
}
