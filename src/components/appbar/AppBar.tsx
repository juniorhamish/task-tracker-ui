import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { User } from '../content/AuthenticatedContent';

interface Props {
  onLogin: () => void;
  onLogout: () => void;
  user?: User;
}

export default function AppBar({ onLogin, onLogout, user }: Props) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  return (
    <MuiAppBar position="static">
      <Toolbar disableGutters sx={{ p: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ maxWidth: 60, verticalAlign: 'middle' }} component="img" src={logo} alt="Task Tracker logo" />
        </Box>
        {!user ? (
          <Box>
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ p: 0 }}
              onClick={(event) => {
                setAnchorElUser(event.currentTarget);
              }}
            >
              <Avatar src={user.picture} alt={user.name} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              open={!!anchorElUser}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              <MenuItem onClick={onLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
