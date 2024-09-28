import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function VerifiedRoute({ children }: Readonly<Props>) {
  const { isAuthenticated, isLoading, user } = useAuth0();
  return isLoading || (isAuthenticated && user?.email_verified) ? children : <Navigate to="/" />;
}
