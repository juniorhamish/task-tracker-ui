import { expect, vi } from 'vitest';
import axios from 'axios';
import getUserInfo from './UserInfoService';

describe('user info service', () => {
  it('should send the GET request to the userinfo endpoint', async () => {
    const get = vi.spyOn(axios, 'get');
    get.mockResolvedValueOnce({});

    await getUserInfo('MyToken');

    expect(get).toHaveBeenCalledWith('/api/userinfo', { headers: { Authorization: 'Bearer MyToken' } });
  });
  it('should return the user info', async () => {
    const get = vi.spyOn(axios, 'get');
    get.mockResolvedValueOnce({ data: { firstName: 'Dave' } });

    const userInfo = await getUserInfo('');

    expect(userInfo).toEqual({ firstName: 'Dave' });
  });
});
