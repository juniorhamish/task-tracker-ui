import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import { UserInfo } from '../../gen/client';

interface Props {
  user?: UserInfo;
}

export default function AuthenticatedContent({ user }: Props) {
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <Grid2 container alignContent="center" justifyContent="center" flexGrow={1}>
      <Grid2>
        <Card variant="outlined">
          <CardMedia component="img" height="194" image={user.picture} />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {user.nickname}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
