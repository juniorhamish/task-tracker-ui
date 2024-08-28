import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import AppBar from '../appbar/AppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';
import Welcome from '../welcome/Welcome';
import { User } from '../../common/types';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  let userDetails: User | undefined;
  if (isAuthenticated) {
    userDetails = {
      ...user,
    };
  }
  return (
    <Container
      maxWidth="lg"
      disableGutters
      component="main"
      sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}
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
        user={userDetails}
      />
      {!isLoading && (
        <Routes>
          <Route path="/home" element={<AuthenticatedContent user={userDetails} />} />
          <Route path="/verify" element={<UnverifiedUser user={userDetails} />} />
          <Route path="/" element={<Welcome user={userDetails} />} />
        </Routes>
      )}
      <Backdrop open={isLoading} aria-hidden={!isLoading}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
}
