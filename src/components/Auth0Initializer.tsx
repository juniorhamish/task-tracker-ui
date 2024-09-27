import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { client } from '../gen/client';
import { log } from '../logging/Log.ts';

export default function Auth0Initializer() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  useEffect(() => {
    client.setConfig({ baseURL: '/api' });
    const addAuthorizationHeader = client.instance.interceptors.request.use(async (config) => {
      let token: string | undefined;
      try {
        token = await getAccessTokenSilently();
      } catch (e) {
        if (e instanceof Error) {
          await log.error('Failed to get token silently.', e);
        }
        token = await getAccessTokenWithPopup();
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => client.instance.interceptors.request.eject(addAuthorizationHeader);
  }, [getAccessTokenSilently, getAccessTokenWithPopup, client]);
  return <></>;
}