import { AppBar as MuiAppBar, Box, Button, Toolbar } from '@mui/material';
import logo from '../../assets/logo.png';

interface Props {
  onLogin: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export default function AppBar({ onLogin, onLogout, isAuthenticated }: Props) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box sx={{ mr: 'auto', maxWidth: 50 }} component="img" src={logo} alt="Task Tracker logo" />
        {!isAuthenticated ? (
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
