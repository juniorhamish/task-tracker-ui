import { AppBar as MuiAppBar, Avatar, Box, Button, Toolbar } from '@mui/material';
import logo from '../../assets/logo.png';
import { User } from '../content/AuthenticatedContent';

interface Props {
  onLogin: () => void;
  onLogout: () => void;
  user?: User;
}

export default function AppBar({ onLogin, onLogout, user }: Props) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box sx={{ mr: 'auto', maxWidth: 50 }} component="img" src={logo} alt="Task Tracker logo" />
        {!user ? (
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
            <Avatar src={user.picture} alt={user.name} />
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
