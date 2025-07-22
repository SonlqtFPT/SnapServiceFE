import { getAPI } from '@/lib/axios';
import { ReportOrdersByMonthResponse } from '@/model/response/reportResponse';

export const fetchOrdersByMonth = async (year: number, month: number): Promise<ReportOrdersByMonthResponse> => {
  const api = getAPI();
  const response = await api.get(`/api/Report/ordersbymonth`, {
    params: { year, month,page: 1,
    pageSize: 60,  },
  });
  return response.data.data;
};