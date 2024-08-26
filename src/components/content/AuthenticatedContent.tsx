import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function AuthenticatedContent() {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  if (!user.email_verified) {
    return <Navigate to="/verify" />;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Grid item xs={3}>
        <Card variant="outlined">
          <CardMedia component="img" height="194" image={user.picture} />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
              {`${user.given_name ?? ''} ${user.family_name ?? ''} ${user.name ?? ''} ${user.nickname ?? ''}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
