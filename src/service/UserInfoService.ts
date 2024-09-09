import axios from 'axios';
import { UserInfoResponse } from '../common/types';

const getUserInfo = async (token: string) => {
  const response = await axios.get<UserInfoResponse>('/api/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default getUserInfo;
