import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Welcome from '../welcome/Welcome.tsx';

export default function HomeRoute() {
  const { isAuthenticated, user } = useAuth0();
  let result = <Welcome />;
  if (isAuthenticated && user?.email_verified) {
    result = <Navigate to="/home" />;
  } else if (isAuthenticated && user && !user.email_verified) {
    result = <Navigate to="/verify" />;
  }
  return result;
}
