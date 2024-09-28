import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Welcome from '../welcome/Welcome.tsx';

export default function HomeRoute() {
  const { isAuthenticated, user } = useAuth0();
  const userVerified = useMemo(() => isAuthenticated && user?.email_verified, [isAuthenticated, user]);
  const userUnverified = useMemo(() => isAuthenticated && user && !user.email_verified, [isAuthenticated, user]);
  let result = <Welcome />;
  if (userVerified) {
    result = <Navigate to="/home" />;
  } else if (userUnverified) {
    result = <Navigate to="/verify" />;
  }
  return result;
}
