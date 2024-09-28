import { Card, CardContent, Grid2, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { UserInfo } from '../../gen/client';

interface Props {
  user?: UserInfo;
}
export default function Welcome({ user }: Readonly<Props>) {
  if (user) {
    return <Navigate to="/home" />;
  }
  return (
    <Grid2 container alignContent="center" justifyContent="center" flexGrow={1}>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Task Tracker
          </Typography>
          <Typography gutterBottom>Please log in or sign up!</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}
