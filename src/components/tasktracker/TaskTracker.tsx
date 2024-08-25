import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '../appbar/AppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  return (
    <Container maxWidth="lg" disableGutters>
      <AppBar
        onLogin={() => {
          loginWithPopup()
            .then(() => true)
            .catch(() => {});
        }}
        onLogout={() => {
          logout({ logoutParams: { returnTo: window.location.origin } })
            .then(() => true)
            .catch(() => {});
        }}
        isAuthenticated={isAuthenticated}
      />
      {isAuthenticated && !user?.email_verified && <UnverifiedUser />}
      {isAuthenticated && user?.email_verified && (
        <AuthenticatedContent
          user={{ givenName: user.given_name, familyName: user.family_name, name: user.name, picture: user.picture }}
        />
      )}
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
}
