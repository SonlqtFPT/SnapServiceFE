import { getAPI } from '@/lib/axios';
import { Supplier } from '@/types/user/SupplierType'; // bạn cần tạo type nếu chưa có

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const api = getAPI();
  const res = await api.get('/api/Supplier/suppliers');
  return res.data.data;
};

export const moderateSupplier = async (supplierId: number, approve: boolean) => {
  const api = getAPI();
  const res = await api.put(`/api/Supplier/update-permission/${supplierId}`, null, {
    params: { approve },
  });
  return res.data;
};
