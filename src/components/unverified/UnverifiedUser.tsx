import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function UnverifiedUser() {
  const { user } = useAuth0();
  if (!user || user.email_verified) {
    return <Navigate to="/" />;
  }
  return (
    <Grid container alignItems="center" justifyContent="center" flexGrow={1}>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Task Tracker
          </Typography>
          <Typography gutterBottom>Please verify your email address.</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
