import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopAppBar from '../topappbar/TopAppBar';
import UnverifiedUser from '../unverified/UnverifiedUser';
import AuthenticatedContent from '../content/AuthenticatedContent';
import Welcome from '../welcome/Welcome';
import { UserInfo } from '../../common/types';
import MyProfile from '../profile/MyProfile';
import getUserInfo from '../../service/UserInfoService';

export default function TaskTracker() {
  const { loginWithPopup, isAuthenticated, isLoading, user, logout, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    if (isAuthenticated && user) {
      const retrieveUserInfo = async () => {
        const token = await getAccessTokenSilently();
        const userDetails = await getUserInfo(token);
        setUserInfo({ ...userDetails, emailVerified: !!user.email_verified });
      };
      retrieveUserInfo().catch(() => {});
    }
  }, [isAuthenticated, getAccessTokenSilently, setUserInfo, user]);
  const userInfoLoaded = !isLoading && (!isAuthenticated || !!userInfo);
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
            .catch(() => {});
        }}
        onLogout={() => {
          logout({ logoutParams: { returnTo: window.location.origin } })
            .then(() => true)
            .catch(() => {});
        }}
        user={userInfo}
      />
      {userInfoLoaded && (
        <Routes>
          <Route path="/home" element={<AuthenticatedContent user={userInfo} />} />
          <Route path="/verify" element={<UnverifiedUser user={userInfo} />} />
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
