import { useAuth0 } from '@auth0/auth0-react';
import {
  Backdrop,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { useMemo } from 'react';
import AuthenticatedContent from './components/content/AuthenticatedContent';
import UnverifiedUser from './components/unverified/UnverifiedUser';
import AppBar from './components/appbar/AppBar';

function App() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
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
    </ThemeProvider>
  );
}

export default App;
