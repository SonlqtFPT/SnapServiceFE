import { getAPI } from '@/lib/axios';

const api = getAPI();

export const fetchOrder = async (page: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await api.get(`/api/Order?page=${page}&pageSize=10`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data; // Adjust based on your API response structure
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}