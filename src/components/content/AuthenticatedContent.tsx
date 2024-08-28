import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function AuthenticatedContent() {
  const { user } = useAuth0();
  if (!user) {
    return <Navigate to="/" />;
  }
  if (!user.email_verified) {
    return <Navigate to="/verify" />;
  }
  return (
    <Grid container alignContent="center" justifyContent="center" flexGrow={1}>
      <Grid item>
        <Card variant="outlined">
          <CardMedia component="img" height="194" image={user.picture} />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {`${user.given_name ?? ''} ${user.family_name ?? ''} ${user.name ?? ''} ${user.nickname ?? ''}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
