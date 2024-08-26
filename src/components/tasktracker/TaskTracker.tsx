import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import AppBar from '../appbar/AppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';
import Welcome from '../welcome/Welcome';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  const userDetails = {
    givenName: user?.given_name,
    familyName: user?.family_name,
    name: user?.name,
    picture: user?.picture,
  };
  return (
    <Container
      maxWidth="lg"
      disableGutters
      component="main"
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
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
        user={isAuthenticated ? userDetails : undefined}
      />
      <Routes>
        <Route path="/home" element={<AuthenticatedContent />} />
        <Route path="/verify" element={<UnverifiedUser />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
      <Backdrop open={isLoading} aria-hidden={!isLoading}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
}
