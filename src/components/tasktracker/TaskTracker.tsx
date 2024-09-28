import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopAppBar from '../topappbar/TopAppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';
import MyProfile from '../profile/MyProfile';
import { UserInfo, UserInfoService } from '../../gen/client';
import { log } from '../../logging/Log.ts';
import VerifiedRoute from '../routing/VerifiedRoute.tsx';
import HomeRoute from '../routing/HomeRoute.tsx';
import UnverifiedRoute from '../routing/UnverifiedRoute.tsx';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout } = useAuth0();
  const navigate = useNavigate();
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
            .then(async () => await log.info('Successfully logged in.'))
            .catch(async () => await log.error('Error logging in.'));
        }}
        onLogout={() => {
          logout({ logoutParams: { returnTo: window.location.origin } })
            .then(async () => await log.info('Successfully logged out.'))
            .catch(async () => await log.error('Error logging out.'));
        }}
        onMyProfile={() => navigate('/profile')}
        user={userInfo}
      />
      <Routes>
        <Route
          path="/home"
          element={
            <VerifiedRoute>
              <AuthenticatedContent user={userInfo} />
            </VerifiedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <VerifiedRoute>
              <MyProfile user={userInfo} />
            </VerifiedRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <UnverifiedRoute>
              <UnverifiedUser />
            </UnverifiedRoute>
          }
        />
        <Route path="/" element={<HomeRoute />} />
        <Route path={'/*'} element={<Navigate to="/" />} />
      </Routes>
      <Backdrop open={!userInfoLoaded} aria-hidden={userInfoLoaded}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
}
