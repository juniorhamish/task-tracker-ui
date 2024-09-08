import axios from 'axios';
import { UserInfoResponse } from '../common/types';

const getUserInfo = async (token: string) => {
  const response = await axios.get('/api/userinfo', { headers: { Authorization: `Bearer ${token}` } });
  return response.data as UserInfoResponse;
};

export default getUserInfo;
