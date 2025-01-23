import { useAuth0 } from '@auth0/auth0-react';
import { ILogtailLog } from '@logtail/types';
import { useEffect } from 'react';
import log from './Log';

export default function LoggingMetaData() {
  const { user } = useAuth0();
  useEffect(() => {
    async function enrichLogs(logEntry: ILogtailLog): Promise<ILogtailLog> {
      return {
        ...logEntry,
        user: user?.email,
      };
    }
    log.use(enrichLogs);
  }, [user]);
  return null;
}
