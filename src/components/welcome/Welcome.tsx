import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export default function Welcome() {
  const { isLoading, user, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated && user) {
    return <Navigate to="/home" />;
  }
  return (
    <Grid container alignContent="center" justifyContent="center" flexGrow={1}>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Task Tracker
          </Typography>
          <Typography gutterBottom>Please log in or sign up!</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
