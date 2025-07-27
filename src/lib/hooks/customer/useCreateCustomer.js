import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpClient } from '../../api/http-client.js';
import { API_ENDPOINTS } from '../../api/api-endpoints.js';


export function useCreateCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (customerData) => {
            return HttpClient.post(`${API_ENDPOINTS.CUSTOMER}`, customerData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["customers"])
        }
    });
}
