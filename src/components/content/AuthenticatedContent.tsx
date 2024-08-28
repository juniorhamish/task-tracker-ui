import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { User } from '../../common/types';

interface Props {
  user?: User;
}

export default function AuthenticatedContent({ user }: Props) {
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
