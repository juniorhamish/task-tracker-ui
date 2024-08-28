import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { User } from '../../common/types';

interface Props {
  user?: User;
}
export default function Welcome({ user }: Props) {
  if (user) {
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
