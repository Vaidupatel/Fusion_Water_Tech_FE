import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpClient } from "../../api/http-client";
import { API_ENDPOINTS } from "../../api/api-endpoints";

export function useDeleteCustomerType() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            return HttpClient.delete(`${API_ENDPOINTS.CUSTOMER_TYPE}/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["customerTypes"])
        }
    });
}
