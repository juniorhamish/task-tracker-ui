import { Card, CardContent, Grid2, Typography } from '@mui/material';

export default function Welcome() {
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
