import { Navigate } from 'react-router-dom';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { User } from '../../common/types';

interface Props {
  user?: User;
}

export default function UnverifiedUser({ user }: Props) {
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
