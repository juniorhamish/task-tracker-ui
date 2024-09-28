import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function UnverifiedRoute({ children }: Readonly<Props>) {
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated && !user?.email_verified ? children : <Navigate to="/" />;
}
