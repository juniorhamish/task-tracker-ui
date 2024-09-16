import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { client } from '../gen/client';

export default function Auth0Initializer() {
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    client.instance.interceptors.request.use(async (config) => {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [getAccessTokenSilently]);
  return <></>;
}
