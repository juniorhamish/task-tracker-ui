import { Card, CardContent, Grid2, Typography } from '@mui/material';

export default function UnverifiedUser() {
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
