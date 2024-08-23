import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, Toolbar } from '@mui/material';
import reactLogo from './assets/react.svg';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();

  if (!isAuthenticated || !user?.email_verified) {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              onClick={() => {
                loginWithPopup()
                  .then((value) => {
                    return value;
                  })
                  .catch(() => {});
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {user && !user.email_verified && <div>Please verify your email address.</div>}
      </>
    );
  }
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>{`${user.given_name ?? ''} ${user.family_name ?? ''}`}</h2>
      <img src={user.picture} alt={user.name} className="logo react" />
      <div className="card">
        <button
          type="button"
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } })
              .then((value) => value)
              .catch(() => {});
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default App;
