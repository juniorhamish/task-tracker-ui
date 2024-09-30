import { useAuth0 } from '@auth0/auth0-react';
import { log } from './Log.ts';
import { ILogtailLog } from '@logtail/types';
import { useEffect } from 'react';

export default function LoggingMetaData() {
  const { user } = useAuth0();
  useEffect(() => {
    async function enrichLogs(log: ILogtailLog): Promise<ILogtailLog> {
      return {
        ...log,
        user: user?.email,
      };
    }
    log.use(enrichLogs);
  }, [user]);
  return <></>;
}
