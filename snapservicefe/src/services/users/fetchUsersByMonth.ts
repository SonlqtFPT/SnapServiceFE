import { getAPI } from '@/lib/axios';
import { UsersByMonthResponse } from '@/model/response/userResponse';

export const fetchUsersByMonth = async (
  year: number,
  month: number
): Promise<UsersByMonthResponse> => {
  const api = getAPI();
  const response = await api.get('/api/User/usersbymonth', {
    params: {
      year,
      month
    },
  });
  return response.data.data;
};
