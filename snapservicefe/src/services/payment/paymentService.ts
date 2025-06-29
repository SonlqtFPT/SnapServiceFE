import { getAPI } from "@/lib/axios";

const api = getAPI();

export const paypalPayment = async (total: string) => {
    try {
        const response = await api.post('/api/Payment/paypal', JSON.stringify(total), {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error during PayPal payment:", error);
        throw error;
    }
}