import { AppBar as MuiAppBar, Box, Button, Toolbar } from '@mui/material';

interface Props {
  onLogin: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export default function AppBar({ onLogin, onLogout, isAuthenticated }: Props) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box sx={{ ml: 'auto' }} />
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