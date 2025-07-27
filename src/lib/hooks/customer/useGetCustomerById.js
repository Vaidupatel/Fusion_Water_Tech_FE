import { HttpClient } from '../../api/http-client.js';
import { API_ENDPOINTS } from '../../api/api-endpoints.js';
import { useQuery } from '@tanstack/react-query';


export function useGetCustomerById(id) {
    return useQuery({
        queryKey: ["customer", id],
        queryFn: async () => {
            const { data } = await HttpClient.get(`${API_ENDPOINTS.CUSTOMER}/${id}`)
            return data;
        },

        onError: (error) => {
            return error
        },
        enabled: !!id
    });
}
