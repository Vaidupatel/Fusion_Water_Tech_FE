import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpClient } from '../../api/http-client.js';
import { API_ENDPOINTS } from '../../api/api-endpoints.js';


export function useCompletesSrvice() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => {
            return HttpClient.post(`${API_ENDPOINTS.DUE_SERVICE}/${id}/complete`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["dueServices"])
        }
    });
}
