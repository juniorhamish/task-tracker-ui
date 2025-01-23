import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Context } from '@logtail/types';
import { client } from '../gen/client';
import log from '../logging/Log';

export default function Auth0Initializer() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  useEffect(() => {
    client.setConfig({ baseURL: '/api' });
    const addAuthorizationHeader = client.instance.interceptors.request.use(async (config) => {
      let token: string | undefined;
      const updatedConfig = { ...config };
      try {
        token = await getAccessTokenSilently();
      } catch (e) {
        await log.error('Failed to get token silently.', e as Context);
        token = await getAccessTokenWithPopup();
      }
      updatedConfig.headers.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });
    return () => client.instance.interceptors.request.eject(addAuthorizationHeader);
  }, [getAccessTokenSilently, getAccessTokenWithPopup]);
  return null;
}
