import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopAppBar from '../topappbar/TopAppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';
import Welcome from '../welcome/Welcome';
import MyProfile from '../profile/MyProfile';
import { UserInfo, UserInfoService } from '../../gen/client';
import { log } from '../../logging/Log.ts';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    if (isAuthenticated && user) {
      const retrieveUserInfo = async () => {
        const data = (await UserInfoService.get()).data;
        await log.info('Got user info.', { userInfo: data });
        setUserInfo(data);
      };
      retrieveUserInfo().catch(async () => {
        await log.error('Error getting user info.');
      });
    }
  }, [isAuthenticated, setUserInfo, user]);
  const userInfoLoaded = !isLoading && (!isAuthenticated || !!userInfo || !user?.email_verified);
  return (
    <Container
      maxWidth="lg"
      disableGutters
      component="main"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <TopAppBar
        onLogin={() => {
          loginWithPopup()
            .then(() => true)
            .catch(async () => {
              await log.error('Error logging in.');
            });
        }}
        onLogout={() => {
          logout({ logoutParams: { returnTo: window.location.origin } })
            .then(async () => {
              return await log.info('Successfully logged out.');
            })
            .catch(async () => {
              await log.error('Error logging out.');
            });
        }}
        user={userInfo}
      />
      {user && !user.email_verified && <Navigate to="/verify" />}
      {userInfoLoaded && (
        <Routes>
          <Route path="/home" element={<AuthenticatedContent user={userInfo} />} />
          <Route
            path="/verify"
            element={<UnverifiedUser loggedIn={isAuthenticated} verified={!!user?.email_verified} />}
          />
          <Route path="/profile" element={<MyProfile user={userInfo} />} />
          <Route path="/" element={<Welcome user={userInfo} />} />
        </Routes>
      )}
      <Backdrop open={!userInfoLoaded} aria-hidden={userInfoLoaded}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
}
