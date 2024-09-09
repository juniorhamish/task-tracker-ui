import { Navigate } from 'react-router-dom';
import { Card, CardContent, Grid2, Typography } from '@mui/material';
import { UserInfo } from '../../common/types';

interface Props {
  user?: UserInfo;
}

export default function UnverifiedUser({ user }: Props) {
  if (!user || user.emailVerified) {
    return <Navigate to="/" />;
  }
  return (
    <Grid2 container alignItems="center" justifyContent="center" flexGrow={1}>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Task Tracker
          </Typography>
          <Typography gutterBottom>Please verify your email address.</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}
