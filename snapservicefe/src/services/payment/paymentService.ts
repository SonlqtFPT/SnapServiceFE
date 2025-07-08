import { CartItem } from "@/app/cart/typeOfCart";
import { userData } from "@/app/checkout/success/PaymentSuccessPage";
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

export const Order = async (userData: userData, productsData: Record<number, CartItem[]>, distance: number, total: number, token: string) => {
    try {
        const supplierIds = Object.keys(productsData).map(Number);
        const apiCalls = supplierIds.map(async (supplierId) => {
            const param = {
                supplierId: supplierId, // Sử dụng supplierId hiện tại
                address: userData.address,
                assignAreaRequest: {
                    provinceCode: userData.provinceCode,
                    districtCode: userData.districtCode,
                    wardCode: userData.wardCode,
                },
                distance: distance,
                total: total ?? 0,
                orderDetails: productsData[supplierId].map((item: CartItem) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    discountPercent: item.discountPercent || 0,
                    note: '',
                }))
            }
            console.log(param)
            const res = await api.post('/api/Payment/checkout', param, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error(`API Error: ${res.status} - ${res.statusText}`); // Thông báo lỗi nếu không thành công
            }
        })
        const lastResult = await Promise.all(apiCalls);
        console.log(lastResult)
        return lastResult

    } catch (error) {
        console.log(error)
    }
}
