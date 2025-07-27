import { HttpClient } from '../../api/http-client.js';
import { API_ENDPOINTS } from '../../api/api-endpoints.js';
import { useQuery } from '@tanstack/react-query';


export function useGetServiceHistoryById(id) {
    return useQuery({
        queryKey: ["serviceHistory", id],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.DUE_SERVICE}/${id}/history`)
            return data;
        },

        onError: (error) => {
            return error
        },
        enabled: !!id
    });
}
